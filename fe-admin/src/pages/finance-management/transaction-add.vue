<script setup lang="ts">
const rules = {
  email: [
    (value: unknown) => !!value || 'Not be emptied',
  ],
}

const firstName = ref('')

const formatDate = (date: Date = new Date()) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

const displayDate = ref(formatDate())

watch(displayDate, newVal => {
  console.log(newVal)
})
</script>

<template>
  <VForm @submit.prevent>
    <VRow>
      <VCol cols="6">
        <VTextField
          v-model="firstName"
          label="First name"
          :rules="rules.email"
          :hide-details="false"
        />
      </VCol>

      <VCol cols="6">
        <VTextField
          v-model="firstName"
          label="First name"
          :rules="rules.email"
          :hide-details="false"
        />
      </VCol>

      <VCol cols="6">
        <Calendar v-model="displayDate" />
      </VCol>
    </VRow>

    <VBtn
      type="submit"
      block
      class="mt-2"
    >
      Submit
    </VBtn>
  </VForm>
</template>
