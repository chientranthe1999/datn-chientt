<script setup lang="ts">
const COLORS = { SUCCESS: 'success', ERROR: 'error', INFO: 'info' }
const snackbar = ref(false)
const timeout = ref<number>(5000)
const color = ref<string>(COLORS.SUCCESS)
const message = ref<string>('')

const error = (messageText = '', time = 0) => {
  snackbar.value = true
  message.value = messageText
  color.value = COLORS.ERROR
  if (time && time !== 0)
    timeout.value = time
}

const success = (messageText = '', timeoutParam = 0) => {
  snackbar.value = true
  message.value = messageText
  color.value = COLORS.SUCCESS
  if (timeoutParam && timeoutParam !== 0)
    timeout.value = timeoutParam
}
</script>

<template>
  <VSnackbar
    v-model="snackbar"
    location="top"
    :color="color"
    :timeout="timeout"
  >
    {{ message }}
  </VSnackbar>
</template>
