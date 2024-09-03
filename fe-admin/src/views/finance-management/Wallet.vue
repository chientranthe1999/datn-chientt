<script setup lang="ts">
import { formatCurrency } from '@core/utils/formatters'

const props = defineProps({
  wallets: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <VCard :title="$t('finance.my_wallet')">
    <template #append>
      <div class="me-n2">
        <VBtn color="success" variant="text" append-icon="tabler-chevron-right" :to="{ name: 'finance-management-wallet-category' }">
          {{ $t('see_all') }}
        </VBtn>
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="wallet in props.wallets"
          :key="wallet.id"
        >
          <template #prepend>
            <VAvatar size="34" variant="tonal">
              <VIcon :icon="wallet.icon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ wallet.name }}
          </VListItemTitle>

          <template #append>
            {{ formatCurrency(wallet.total) }}
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
