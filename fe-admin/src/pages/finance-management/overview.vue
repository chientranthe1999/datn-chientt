<script lang="ts" setup>
import RecentTransaction from '@/views/finance-management/RecentTransaction.vue'
import type { ChartJsCustomColors } from '@/views/charts/chartjs/types'
import SpendingChart from '@/views/finance-management/SpendingChart.vue'

const chartJsCustomColors: ChartJsCustomColors = {
  white: '#fff',
  yellow: '#ffe802',
  primary: '#29A073',
  areaChartBlue: '#2c9aff',
  barChartYellow: '#ffcf5c',
  polarChartGrey: '#4f5d70',
  polarChartInfo: '#299aff',
  lineChartYellow: '#d4e157',
  polarChartGreen: '#28dac6',
  lineChartPrimary: '#9e69fd',
  lineChartWarning: '#ff9800',
  horizontalBarInfo: '#26c6da',
  polarChartWarning: '#ff8131',
  scatterChartGreen: '#28c76f',
  warningShade: '#ffbd1f',
  areaChartBlueLight: '#84d0ff',
  areaChartGreyLight: '#edf1f4',
  scatterChartWarning: '#ff9f43',
}
</script>

<template>
  <div />
  <VRow>
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard>
        <VCardText>
          <VRow
            class="align-center"
          >
            <VCol
              cols="3"
              class="d-flex justify-center"
            >
              <VAvatar
                color="primary"
                variant="tonal"
                size="42"
                icon="tabler-credit-card"
              />
            </VCol>

            <VCol cols="9">
              <div class="mb-2">
                {{ $t('balance') }}
              </div>
              <div class="text-h6">
                250 250
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard>
        <VCardText>
          <VRow
            class="align-center"
          >
            <VCol
              cols="3"
              class="d-flex justify-center"
            >
              <VAvatar
                color="info"
                variant="tonal"
                size="42"
                icon="tabler-chart-bar"
              />
            </VCol>

            <VCol cols="9">
              <div class="mb-2">
                {{ $t('spending') }}
              </div>
              <div class="text-h6">
                250 250
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard>
        <VCardText>
          <VRow
            class="align-center"
          >
            <VCol
              cols="3"
              class="d-flex justify-center"
            >
              <VAvatar
                color="success"
                variant="tonal"
                size="42"
                icon="tabler-arrow-elbow-right"
              />
            </VCol>

            <VCol cols="9">
              <div class="mb-2">
                {{ $t('incoming') }}
              </div>
              <div class="text-h6">
                250 250
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <!--    TODO: filter by month, year -->
    <!--    TOP category spending -->
    <VCol cols="12">
      <VCard
        title="Spending Report"
        subtitle="Commercial networks and enterprises"
      >
        <VCardText>
          <SpendingChart :colors="chartJsCustomColors" />
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <RecentTransaction />
    </VCol>
  </VRow>
</template>
