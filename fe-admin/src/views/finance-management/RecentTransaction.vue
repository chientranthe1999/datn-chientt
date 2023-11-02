<script setup lang="ts">
import aeIcon from '@images/icons/payments/ae-icon.png'
import mastercardIcon from '@images/icons/payments/mastercard-icon.png'
import visaIcon from '@images/icons/payments/visa-icon.png'

interface Status {
  Verified: string
  Rejected: string
  Pending: string
}

interface Transaction {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}

const lastTransactions: Transaction[] = [
  {
    cardImg: visaIcon,
    lastDigit: '*4230',
    cardType: 'Global',
    sentDate: '17 Mar 2022',
    status: 'Verified',
    trend: '+$1,678',
  },
  {
    cardImg: mastercardIcon,
    lastDigit: '*5578',
    cardType: 'Credit',
    sentDate: '12 Feb 2022',
    status: 'Rejected',
    trend: '-$839',
  },
  {
    cardImg: aeIcon,
    lastDigit: '*4567',
    cardType: 'Credit',
    sentDate: '28 Feb 2022',
    status: 'Verified',
    trend: '+$435',
  },
  {
    cardImg: visaIcon,
    lastDigit: '*5699',
    cardType: 'Credit',
    sentDate: '8 Jan 2022',
    status: 'Pending',
    trend: '+$2,345',
  },
  {
    cardImg: visaIcon,
    lastDigit: '*5699',
    cardType: 'Credit',
    sentDate: '8 Jan 2022',
    status: 'Rejected',
    trend: '-$234',
  },
]

const resolveStatus: Status = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
}
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
            NAME/WALLET
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
          v-for="transaction in lastTransactions"
          :key="transaction.lastDigit"
        >
          <td style="padding-block: 0.61rem;">
            <div class="d-flex align-center">
              <div class="me-3">
                <VImg
                  :src="transaction.cardImg"
                  width="50"
                />
              </div>
              <div>
                <p class="text-medium-emphasis font-weight-semibold text-base mb-0">
                  {{ transaction.lastDigit }}
                </p>
                <p class="text-sm mb-0 opacity-100 text-disabled">
                  {{ transaction.cardType }}
                </p>
              </div>
            </div>
          </td>
          <td style="padding-block: 0.61rem;">
            <VChip
              label
              :color="resolveStatus[transaction.status]"
            >
              {{ transaction.status }}
            </VChip>
          </td>
          <td style="padding-block: 0.61rem;">
            <p class="text-medium-emphasis font-weight-semibold text-base mb-0">
              {{ transaction.trend }}
            </p>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="text-sm opacity-100 text-disabled">{{ transaction.sentDate }}</span>
          </td>
          <td style="padding-block: 0.61rem; width: 60px;">
            <VBtn
              size="small"
            >
              Detail
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
