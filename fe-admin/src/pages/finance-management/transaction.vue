<script lang="ts" setup>
type Headers = InstanceType<typeof VDataTable>['headers']

const headers: Headers[] = [
  {
    title: 'Dessert',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Calories', align: 'end', key: 'calories', sortable: false },
  { title: 'Fat', align: 'end', key: 'fat', sortable: false },
  { title: 'Carbs', align: 'end', key: 'carbs', sortable: false },
  { title: 'Protein', align: 'end', key: 'protein', sortable: false },
  { title: 'Iron (%)', align: 'center', key: 'iron', sortable: false },
]

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
]
</script>

<template>
  <VCard title="Transaction List">
    <VCardText>
      <DataTable :columns="headers" :items="[]" />
    </VCardText>
  </VCard>
</template>

