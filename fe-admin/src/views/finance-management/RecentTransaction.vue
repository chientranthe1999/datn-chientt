<script setup lang="ts">
import { formatCurrency, formatDate } from '@core/utils/formatters'

const props = defineProps({
  transactions: {
    type: Object,
    default: () => ({}),
  },
})

const router = useRouter()
</script>

<template>
  <VCard :title="$t('finance.recent_transaction')">
    <template #append>
      <div class="me-n2">
        <VBtn color="success" variant="text">
          {{ $t('see_all') }}
          <VIcon end icon="tabler-chevron-right" />
        </VBtn>
      </div>
    </template>

    <VDivider />
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th class="font-weight-semibold">
            WALLET
          </th>
          <th class="font-weight-semibold">
            CATEGORY
          </th>
          <th class="font-weight-semibold">
            AMOUNT
          </th>
          <th class="font-weight-semibold">
            DATE
          </th>
          <th class="font-weight-semibold">
            DETAIL
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="transaction in props.transactions"
          :key="transaction.id"
        >
          <td style="padding-block: 0.61rem;">
            <span>{{ transaction.wallet.name || '' }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span>{{ transaction.category.name || '' }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span>
              {{ formatCurrency(transaction.amount) }}
            </span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span>{{ formatDate(transaction.action_time) }}</span>
          </td>
          <td style="padding-block: 0.61rem; width: 60px;">
            <VBtn size="small" @click="router.push({ name: 'finance-management-transaction-edit', params: { id: transaction.id } })">
              Detail
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
