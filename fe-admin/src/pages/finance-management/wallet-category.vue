<script lang="ts" setup>
import { formatCurrency } from '@core/utils/formatters'
import CategoryAddDialog from '@/views/finance-management/CategoryAddDialog.vue'
import { categoriesApi } from '@/api/categories.api'
import { HTTP_STATUS } from '@/constants/common'
import CategoryEditDialog from '@/views/finance-management/CategoryEditDialog.vue'
import WalletAddDialog from '@/views/finance-management/WalletAddDialog.vue'
import { walletsApi } from '@/api/wallets.api'
import type { WalletResponse } from '@core/common/interface'
import WalletEditDialog from '@/views/finance-management/WalletEditDialog.vue'

// region Variable declare
const wallets = ref<WalletResponse[]>([])
const categories = ref([])
const selectedCategory = ref({})
const selectedWallet = ref({})
const isEditCategoryVisible = ref(false)
const isEditWalletVisible = ref(false)
const { t } = useI18n()

const headers = [
  { title: 'Wallet', width: '15', align: 'start', key: 'name' },
  { title: 'Amount', width: '15', align: 'center', key: 'total', value: (item: WalletResponse) => formatCurrency(item.total) },
  { title: 'Report exclude', width: '15', align: 'center', key: 'report_exclude' },
  { title: '', width: '15', key: 'action' },
]

// endregion

// region Function declare
const getCategoryList = async () => {
  try {
    const result = await categoriesApi.getTree()

    if (result.status === HTTP_STATUS.OK)
      categories.value = result.data.items
  }
  catch (e) {
    console.log(e)
  }
}

const getListWallet = async () => {
  try {
    const result = await walletsApi.get()

    if (result.status === HTTP_STATUS.OK)
      wallets.value = result.data.data
  }
  catch (e) {
    console.log(e)
  }
}

const handleCloseCategoryModal = async (needUpdateData = false) => {
  if (needUpdateData)
    await getCategoryList()
}

const handleCloseEditModal = async (needUpdateData = false) => {
  isEditCategoryVisible.value = false
  if (needUpdateData)
    await getCategoryList()
}

const handleCloseEditWalletModal = async (needUpdateData = false) => {
  isEditWalletVisible.value = false
  if (needUpdateData)
    await getListWallet()
}

const editCategory = (props: any) => {
  selectedCategory.value = {
    ...props,
    group_id: props.group_id || null,
  }
  isEditCategoryVisible.value = true
}

const editWallet = (props: any) => {
  selectedWallet.value = {
    ...props,
    group_id: props.group_id || null,
  }
  isEditWalletVisible.value = true
}

// endregion

// region Function call
getListWallet()
getCategoryList()

// endregion
</script>

<template>
  <VRow>
    <VCol cols="12" sm="12" md="12" lg="7">
      <VCard title="My wallet">
        <template #append>
          <WalletAddDialog @close-modal="(needUpdate: boolean) => { if (needUpdate) getListWallet () }" />
        </template>
        <VDivider />

        <VDataTable :headers="headers" :items="wallets">
          <template #item.action="{ item }">
            <VBtn color="primary" size="x-small" prepend-icon="tabler-pencil" @click="editWallet(item)">{{ t('btn.edit') }}</VBtn>
            <VBtn color="success" size="x-small" class="ms-2" variant="tonal">{{ t('btn.view_transaction') }}</VBtn>
          </template>

          <template #item.report_exclude="{ item }">
            <VChip variant="flat">{{ item.report_exclude ? 'on' : 'off' }}</VChip>
          </template>

          <template #item.name="{ item }">
            <VRow class="align-center">
              <VAvatar variant="tonal" :icon="item.icon" size="40" />
              <span class="ms-2">{{ item.name }}</span>
            </VRow>
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <VCol cols="12" sm="12" md="12" lg="5">
      <VCard title="My Categories">
        <template #append>
          <CategoryAddDialog @close-modal="handleCloseCategoryModal" />
        </template>
        <VDivider />

        <VCardText>
          <VTreeNode
            v-for="(category, index) in categories" :key="`category-${index}`" :items="category"
            @edit="editCategory"
          />
        </VCardText>
      </VCard>
    </VCol>

    <CategoryEditDialog v-if="isEditCategoryVisible" :category="selectedCategory" @close-modal="handleCloseEditModal" />
    <WalletEditDialog v-if="isEditWalletVisible" :wallet="selectedWallet" @close-modal="handleCloseEditWalletModal" />
  </VRow>
</template>

