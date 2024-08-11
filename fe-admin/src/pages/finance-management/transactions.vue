<script lang="ts" setup>
import { walletsApi } from '@/api/wallets.api'
import { categoriesApi } from '@/api/categories.api'
import { transactionApi } from '@/api/transactions.api'
import { formatDate } from '@core/utils/formatters'

const wallets = ref([])
const categories = ref([])
const transactions = ref([])
const { t } = useI18n()

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

const onLimitChange = limit => {
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
        <VCol cols="2.5">
          <VSelect
            v-model="formData.category_id"
            density="compact"
            variant="outlined"
            :label="$t('common.category')"
            item-title="name"
            item-value="id"
            :items="categories"
          />
        </VCol>
        <VCol cols="2.5">
          <VSelect
            v-model="formData.wallet_id"
            density="compact"
            variant="outlined"
            :label="$t('common.wallet')"
            item-title="name"
            item-value="id"
            :items="wallets"
          />
        </VCol>
        <VCol cols="2.5">
          <Calendar v-model:datetime="formData.start_date" label="Start Date" />
        </VCol>
        <VCol cols="2.5">
          <Calendar v-model:datetime="formData.end_date" label="End Date" />
        </VCol>
        <VCol cols="2">
          <VBtn prepend-icon="tabler-search" @click="getList">Search</VBtn>
        </VCol>
      </VRow>

      <VDataTable :headers="headers" :items="transactions" @update:items-per-page="onLimitChange">
        <template #item.action>
          <VBtn color="primary" size="small">Detail</VBtn>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

