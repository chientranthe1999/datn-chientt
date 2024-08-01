<script setup lang="ts">
const transitions = [
  {
    avatarIcon: 'tabler-wallet',
    avatarColor: 'primary',
    title: 'Wallet',
    subtitle: 'Starbucks',
    stats: '50%',
    profit: false,
  },
  {
    avatarIcon: 'tabler-browser-check',
    avatarColor: 'success',
    title: 'Bank Transfer',
    subtitle: 'Add Money',
    stats: '20%',
    profit: false,
  },
  {
    avatarIcon: 'tabler-brand-paypal',
    avatarColor: 'error',
    title: 'Paypal',
    subtitle: 'Client Payment',
    stats: '10%',
    profit: false,
  },
  {
    avatarIcon: 'tabler-credit-card',
    avatarColor: 'secondary',
    title: 'Master Card',
    subtitle: 'Ordered iPhone 13',
    stats: '5%',
    profit: false,
  },
  {
    avatarIcon: 'tabler-currency-dollar',
    avatarColor: 'info',
    title: 'Bank Transactions',
    subtitle: 'Refund',
    stats: '4%',
    profit: false,
  },
  {
    avatarIcon: 'tabler-currency-dollar',
    avatarColor: 'info',
    title: 'Bank Transactions',
    subtitle: 'Refund',
    stats: '4%',
    profit: false,
  },
]
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
          v-for="transition in transitions"
          :key="transition.title"
        >
          <template #prepend>
            <VAvatar size="34" :color="transition.avatarColor" variant="tonal">
              <VIcon :icon="transition.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ transition.title }}
          </VListItemTitle>

          <template #append>
            <div class="d-flex align-center">
              <span :class="`${transition.profit ? 'text-success' : 'text-error'} me-2`">{{ transition.stats }}</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
