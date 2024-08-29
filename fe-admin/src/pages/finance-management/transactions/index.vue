<script lang="ts" setup>
import { walletsApi } from '@/api/wallets.api'
import { categoriesApi } from '@/api/categories.api'
import { transactionApi } from '@/api/transactions.api'
import { formatDate } from '@core/utils/formatters'

const wallets = ref([])
const categories = ref([])
const transactions = ref([])
const { t } = useI18n()
const router = useRouter()

const formData = reactive({
  category_id: '',
  wallet_id: '',
  start_date: '',
  end_date: '',
  page: 1,
  limit: 10,
})

const headers = [
  { title: t('common.name_wallet'), align: 'start', key: 'wallet.name' },
  { title: t('common.category'), align: 'center', key: 'category.name' },
  { title: t('common.amount'), align: 'center', key: 'amount' },
  { title: t('common.date'), align: 'center', key: 'action_time', value: item => formatDate(item.action_time) },
  { title: t('common.action'), align: 'center', key: 'action' },
]

const getOptions = async () => {
  try {
    const [walletRes, categoryRes] = await Promise.all([walletsApi.getOptions(), categoriesApi.getOptions()])

    wallets.value = walletRes?.data?.items || []
    categories.value = categoryRes?.data?.items || []
  }
  catch (e) {
    console.log(e)
  }
}

const getList = async () => {
  const result = await transactionApi.get({ ...formData })

  transactions.value = result.data.data ?? []
}

const onLimitChange = (limit: number) => {
  formData.limit = limit
  getList()
}

getOptions()
getList()
</script>

<template>
  <VCard title="Transaction List">
    <template #append>
      <VBtn prepend-icon="tabler-plus" :to="{ name: 'finance-management-transaction-add' }">Add New</VBtn>
    </template>
    <VDivider />

    <VCardText>
      <VRow class="mb-3">
        <VCol :md="2" :sm="12">
          <VSelect
            v-model="formData.category_id"
            density="compact"
            variant="outlined"
            :label="$t('common.category')"
            item-title="name"
            item-value="id"
            :items="categories"
            clearable
          />
        </VCol>
        <VCol :md="2" :sm="12">
          <VSelect
            v-model="formData.wallet_id"
            density="compact"
            variant="outlined"
            :label="$t('common.wallet')"
            item-title="name"
            item-value="id"
            :items="wallets"
            clearable
          />
        </VCol>
        <VCol :md="2" :sm="12">
          <Calendar v-model:datetime="formData.start_date" label="Start Date" />
        </VCol>
        <VCol :md="2" :sm="12">
          <Calendar v-model:datetime="formData.end_date" label="End Date" />
        </VCol>
        <VCol :md="2" :sm="12">
          <VBtn prepend-icon="tabler-search" @click="getList">Search</VBtn>
        </VCol>
      </VRow>

      <VDataTable :headers="headers" :items="transactions" @update:items-per-page="onLimitChange">
        <template #item.action="{ item }">
          <VBtn
            color="primary" size="x-small" prepend-icon="tabler-pencil"
            @click="router.push({ name: 'finance-management-transaction-edit', params: { id: item.id } })"
          >
            {{ t('btn.edit') }}
          </VBtn>

          <VDialog max-width="500">
            <template #activator="{ props: activatorProps }">
              <VBtn
                color="error" size="x-small" prepend-icon="tabler-trash" class="ms-2"
                variant="tonal"
                v-bind="activatorProps"
              >
                {{ t('btn.delete') }}
              </VBtn>
            </template>

            <template #default="{ isActive }">
              <VCard title="Confirm">
                <VCardText>
                  Do you want to delete this item?
                </VCardText>

                <VCardActions>
                  <VSpacer />

                  <VBtn
                    color="error"
                    variant="tonal"
                    @click="() => {
                      transactionApi.delete(item.id)
                      getList()
                      isActive.value = false
                    }"
                  >
                    {{ $t('btn.delete') }}
                  </VBtn>
                  <VBtn @click="isActive.value = false">{{ $t('btn.cancel') }}</VBtn>
                </VCardActions>
              </VCard>
            </template>
          </VDialog>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

