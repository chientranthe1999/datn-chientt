<script lang="ts" setup>
import CategoryAddDialog from '@/views/finance-management/CategoryAddDialog.vue'
import { categoriesApi } from '@/api/categories.api'
import { HTTP_STATUS } from '@/constants/common'

const headers = [
  { title: 'Wallet', width: '15', align: 'start', key: 'name' },
  { title: 'Amount', width: '15', align: 'end', key: 'amount' },
  { title: '', width: '15', key: 'action' },
]

const desserts = [
  {
    name: 'Frozen Yogurt',
    category: 159,
    amount: 6.0,
    date: 24,
  },
  {
    name: 'Jelly bean',
    category: 375,
    amount: 0.0,
    date: 94,
  },
  {
    name: 'KitKat',
    category: 518,
    amount: 26.0,
    date: 65,
  },
]

const categories = ref([])

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

const handleCloseCategoryModal = async (needUpdateData = false) => {
  if (needUpdateData)
    await getCategoryList()
}

const editCategory = props => {
  console.log(props)
}

getCategoryList()
</script>

<template>
  <VRow>
    <VCol cols="7" md="12" lg="7">
      <VCard title="My wallet">
        <template #append>
          <VBtn prepend-icon="tabler-plus" size="small">Add New</VBtn>
        </template>
        <VDivider />

        <VDataTable :headers="headers" :items="desserts">
          <template #item.action>
            <VBtn color="primary" size="x-small" prepend-icon="tabler-pencil">Edit</VBtn>
            <VBtn color="success" size="x-small" class="ms-2" variant="tonal">Transaction</VBtn>
          </template>

          <template #item.name="{ item }">
            <VRow class="align-center">
              <VAvatar variant="tonal" icon="wallet-default" size="40" />
              <span class="ms-2">{{ item.name }}</span>
            </VRow>
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <VCol cols="5" md="12" lg="5">
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
  </VRow>
</template>

