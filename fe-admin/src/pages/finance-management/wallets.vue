<script lang="ts" setup>
const headers = [
  { title: 'Name/Wallet', align: 'start', key: 'name' },
  { title: 'Calories', align: 'end', key: 'category' },
  { title: 'Amount', align: 'end', key: 'amount' },
  { title: 'Date', align: 'end', key: 'date' },
  { title: '', align: 'center', key: 'action' },
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

    <!--    <VCardText> -->
    <!--      <VRow> -->
    <!--        <VCol cols="2.5"> -->
    <!--          <VSelect -->
    <!--            density="compact" -->
    <!--            variant="outlined" -->
    <!--            label="Category Type" -->
    <!--            :items="[10, 20, 30, 50]" -->
    <!--          /> -->
    <!--        </VCol> -->
    <!--        <VCol cols="2.5"> -->
    <!--          <VSelect -->
    <!--            density="compact" -->
    <!--            variant="outlined" -->
    <!--            label="Start Date" -->
    <!--            :items="[10, 20, 30, 50]" -->
    <!--          /> -->
    <!--        </VCol> -->
    <!--        <VCol cols="2.5"> -->
    <!--          <VSelect -->
    <!--            density="compact" -->
    <!--            variant="outlined" -->
    <!--            label="End Date" -->
    <!--            :items="[10, 20, 30, 50]" -->
    <!--          /> -->
    <!--        </VCol> -->
    <!--        <VCol cols="2.5"> -->
    <!--          <VSelect -->
    <!--            density="compact" -->
    <!--            variant="outlined" -->
    <!--            label="Wallet" -->
    <!--            :items="[10, 20, 30, 50]" -->
    <!--          /> -->
    <!--        </VCol> -->
    <!--        <VCol cols="2"> -->
    <!--          <VBtn prepend-icon="tabler-search">Search</VBtn> -->
    <!--        </VCol> -->
    <!--      </VRow> -->
    <!--    </VCardText> -->

    <DataTable :columns="headers" :items="desserts" :limit="2" :total="10">
      <template #action>
        <VBtn color="primary" size="small" prepend-icon="tabler-pencil">Edit</VBtn>
      </template>
    </DataTable>
  </VCard>
</template>

