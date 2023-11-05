<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface TableColumn {
  title: string
  key: string
  width?: number
}

const props = defineProps({
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
  from: {
    type: Number,
    default: 1,
  },
  to: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 1,
  },
})

const totalPage: ComputedRef<number> = computed(() => Math.floor(props.total / props.limit))
</script>

<template>
  <VCardText>
    <VTable class="text-no-wrap">
      <colgroup>
        <col v-for="(col, index) in columns" :key="`col_${index}`" :style="{ width: `${col.width}%` }">
      </colgroup>
      <!-- 👉 table head -->
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="index" :class="[col.align ? `text-${col.align}` : '']">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <!-- 👉 table body -->
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="`data_row${rowIndex}`">
          <!--          TODO: set width for td -->
          <td v-for="(col, colIndex) in columns" :key="`data_col_${colIndex}`">
            <slot :name="columns[colIndex].key" :col-data="item">
              <div class="w-100" :class="[col.align ? `text-${col.align}` : '']">
                <span>{{ item[col.key] }}</span>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>

      <tfoot v-if="!items.length">
        <tr>
          <td :colspan="columns.length || 1" class="text-center pt-6">
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <VDivider />
  </VCardText>

  <template v-if="items.length">
    <VCardText>
      <div class="d-flex justify-space-between align-center">
        <span class="text-sm text-disabled">
          Showing {{ from }} to {{ to }} of {{ total }} entries
        </span>

        <VPagination v-if="totalPage > 1" size="small" :total-visible="6" :length="totalPage" />
      </div>
    </VCardText>
  </template>
</template>
