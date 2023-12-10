<script lang="ts" setup>
import { CategoryIcon } from '@/constants/common'

const headers = [
  { title: 'Name/Wallet', align: 'start', key: 'name' },
  { title: 'Calories', align: 'center', key: 'category' },
  { title: 'Amount', align: 'center', key: 'amount' },
  { title: 'Date', align: 'center', key: 'date' },
  { title: 'Action', align: 'center', key: 'action' },
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
            density="compact"
            variant="outlined"
            label="Category Type"
            :items="[10, 20, 30, 50]"
          />
        </VCol>
        <VCol cols="2.5">
          <Calendar v-model:datetime="displayDate" label="Start Date" />
        </VCol>
        <VCol cols="2.5">
          <Calendar v-model:datetime="displayDate" label="End Date" />
        </VCol>
        <VCol cols="2.5">
          <VSelect
            density="compact"
            variant="outlined"
            label="Wallet"
            :items="[10, 20, 30, 50]"
          />
        </VCol>
        <VCol cols="2">
          <VBtn prepend-icon="tabler-search">Search</VBtn>
        </VCol>
      </VRow>

      <VDataTable :headers="headers" :items="desserts">
        <template #item.action>
          <VBtn color="primary" size="small">Detail</VBtn>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

