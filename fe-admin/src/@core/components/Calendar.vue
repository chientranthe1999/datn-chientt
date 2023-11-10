<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const formatDate = (date: Date = new Date()) => {
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate()}`
}

const menuDisplay = ref(false)
const displayDate = ref(formatDate())
</script>

<template>
  <VMenu open-on-click :close-on-content-click="true">
    <template #activator="{ props }">
      <VTextField
        v-model="displayDate"
        label="Date"
        v-bind="props"
        append-inner-icon="mdi-calendar"
      />
    </template>

    <VDatePicker
      no-title
      hide-header
      @update:model-value="(val) => {
        displayDate = formatDate(val)
        menuDisplay = false
        emit('update:modelValue', displayDate)
        return false
      }"
    />
  </VMenu>
</template>
