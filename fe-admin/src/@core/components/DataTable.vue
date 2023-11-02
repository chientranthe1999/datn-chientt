<script setup lang="ts">
interface TableColumn {
  title: string
  key: string
  minWidth?: number
}

defineProps({
  columns: {
    type: Array<TableColumn>,
    required: true,
    default: () => [],
  },
  items: {
    type: Array<any>,
    default: () => [],
  },
  limit: {
    type: Number,
    default: 50,
  },
})
</script>

<template>
  <VTable class="text-no-wrap">
    <!-- 👉 table head -->
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <!-- 👉 table body -->
    <tbody>
      <tr v-for="(item, rowIndex) in items" :key="`data_row${rowIndex}`">
        <td v-for="(col, colIndex) in columns" :key="`data_col_${colIndex}`">
          <slot :name="columns[colIndex].key">
            <div class="d-flex align-center">{{ item[columns[colIndex].key] }}</div>
          </slot>
        </td>
      </tr>
    </tbody>

    <template v-if="items.length">
      <VDivider />

      <VPagination
        size="small"
        :total-visible="5"
        :length="10"
      />
    </template>

    <tfoot v-if="!items.length">
      <tr>
        <td :colspan="columns.length || 1" class="text-center pt-6">
          No data available
        </td>
      </tr>
    </tfoot>
  </VTable>
</template>
