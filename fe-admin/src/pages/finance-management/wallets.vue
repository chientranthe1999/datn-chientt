<script lang="ts" setup>
const headers = [
  { title: 'Wallet', width: '15px', align: 'start', key: 'name' },
  { title: 'Calories', width: '15px', align: 'end', key: 'category' },
  { title: 'Amount', width: '15px', align: 'end', key: 'amount' },
  { title: 'Date', width: '15px', align: 'center', key: 'date' },
  { title: '', width: '15px', key: 'action' },
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
  <VCard title="My wallet">
    <template #append>
      <VBtn prepend-icon="tabler-plus">Add New</VBtn>
    </template>
    <VDivider />

    <DataTable :columns="headers" :items="desserts" :limit="2" :total="10">
      <template #action>
        <VBtn color="primary" size="small" prepend-icon="tabler-pencil">Edit</VBtn>
        <VBtn color="success" size="small" class="ms-2" variant="tonal">Transaction</VBtn>
      </template>

      <template #name="{ colData }">
        <VRow class="align-center">
          <VAvatar variant="tonal" icon="wallet-default" size="40" />
          <span class="ms-2">{{ colData.name }}</span>
        </VRow>
      </template>
    </DataTable>
  </VCard>
</template>

