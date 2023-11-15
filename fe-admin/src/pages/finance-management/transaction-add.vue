<script setup lang="ts">
import FileInput from '@/pages/forms/file-input.vue'

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
  <VCard title="Add a new transaction">
    <VDivider />
    <VCardText title="Add a new transaction">
      <VForm @submit.prevent>
        <VRow>
          <VCol cols="6">
            <VTextField
              v-model="firstName"
              label="Amount"
              :rules="rules.email"
              :hide-details="false"
              suffix="$"
            />
          </VCol>
          <VCol cols="6">
            <VSelect
              v-model="firstName"
              label="Category"
              :rules="rules.email"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <VSelect
              v-model="firstName"
              label="Wallet"
              :rules="rules.email"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <Calendar v-model:datetime="displayDate" />
          </VCol>

          <VCol cols="12">
            <VTextarea label="Note" />
          </VCol>
          <VCol cols="12">
            <VFileInput label="Input image" />
          </VCol>
          <VCol cols="12">
            <VCheckbox label="Exclude from report" />
          </VCol>
        </VRow>

        <VBtn type="submit" class="mt-4">
          Submit
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>
