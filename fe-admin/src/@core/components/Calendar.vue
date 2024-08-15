<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Date',
  },
  datetime: {
    type: [String, Date],
    default: new Date(),
  },
})

const emit = defineEmits(['update:datetime'])

const formatDate = (date: Date | string = new Date()) => {
  if (typeof date === 'string')
    date = new Date(date)

  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const menuDisplay = ref(false)
const datePickerValue = ref()
const displayDate = ref(formatDate(props.datetime))

watch(() => props.datetime, () => {
  displayDate.value = formatDate(props.datetime)
})

watch(datePickerValue, newVal => {
  displayDate.value = formatDate(newVal)
  menuDisplay.value = false
  emit('update:datetime', displayDate)
})
</script>

<template>
  <VMenu v-model="menuDisplay" open-on-click :close-on-content-click="false">
    <template #activator="{ props }">
      <VTextField
        v-model="displayDate"
        :label="label"
        v-bind="props"
        append-inner-icon="mdi-calendar"
        clearable
      />
    </template>

    <VDatePicker
      v-model="datePickerValue"
      no-title
      hide-header
    />
  </VMenu>
</template>
