<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { getLineChartSimpleConfig } from '@core/libs/apex-chart/apexCharConfig'

const vuetifyTheme = useTheme()

const balanceChartConfig = computed(() => getLineChartSimpleConfig(vuetifyTheme.current.value))

const series = [
  {
    name: 'Spending',
    data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 120],
  },
  {
    name: 'Incoming',
    colors: '#29A073',
    strokeColors: ['#29A073'],
    data: [280, 120, 220, 180, 270, 120, 70, 90, 200, 150, 160, 80],
  },
]
</script>

<template>
  <VueApexCharts
    type="line"
    height="400"
    :options="balanceChartConfig"
    :series="series"
  />
</template>

