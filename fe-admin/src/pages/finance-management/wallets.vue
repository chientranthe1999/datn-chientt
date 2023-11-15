<script lang="ts" setup>
import { CategoryIcon } from '@/constants/common'

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
</script>

<template>
  <VRow>
    <VCol cols="7">
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

    <VCol cols="5">
      <VCard title="My Categories">
        <template #append>
          <VBtn prepend-icon="tabler-plus" size="small">Add New</VBtn>
        </template>
        <VDivider />

        <VCardText>
          <TreeView />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

