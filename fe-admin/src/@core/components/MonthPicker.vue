<script lang="ts" setup>
import { formatDate } from '@core/utils/formatters'

const componentProps = defineProps({
  label: {
    type: String,
    default: 'Date',
  },
  datetime: {
    type: [String, Date],
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:datetime'])

const menuDisplay = ref(false)
const datePickerValue = ref()
const displayDate = ref(formatDate(componentProps.datetime))

watch(() => componentProps.datetime, () => {
  displayDate.value = formatDate(componentProps.datetime)
})

const updateDate = (val: Date | '') => {
  displayDate.value = formatDate(val)
  menuDisplay.value = false
  emit('update:datetime', displayDate)
}

const updateMonth = val => {
  displayDate.value = val
  menuDisplay.value = false
}
</script>

<template>
  <VMenu v-model="menuDisplay" open-on-click :close-on-content-click="false">
    <template #activator="{ props }">
      <VTextField
        v-model="displayDate"
        :label="label"
        v-bind="{ ...props, ...componentProps }"
        append-inner-icon="mdi-calendar"
        @click:clear="() => updateDate('')"
      />
    </template>

    <VDatePicker
      no-title
      hide-header
      view-mode="months"
      @update:month="updateMonth"
    />
  </VMenu>
</template>
