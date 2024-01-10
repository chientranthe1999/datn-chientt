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
  <VCard :title="$t('finance.transaction_add_title')">
    <VDivider />
    <VCardText title="Add a new transaction">
      <VForm @submit.prevent>
        <VRow>
          <VCol cols="6">
            <VTextField
              v-model="firstName"
              :label="$t('common.amount')"
              :rules="rules.email"
              :hide-details="false"
              suffix="$"
            />
          </VCol>
          <VCol cols="6">
            <VSelect
              v-model="firstName"
              :label="$t('common.category')"
              :rules="rules.email"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <VSelect
              v-model="firstName"
              :label="$t('common.wallet')"
              :rules="rules.email"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <Calendar v-model:datetime="displayDate" />
          </VCol>

          <VCol cols="12">
            <VTextarea :label="$t('common.note')" />
          </VCol>
          <VCol cols="12">
            <p>{{ $t('finance.image') }}</p>
            <ImageUpload />
          </VCol>
          <VCol cols="12">
            <VCheckbox :label="$t('finance.exclude_report')" />
          </VCol>
        </VRow>

        <VBtn type="submit" class="mt-4">
          {{ $t('btn.submit') }}
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>
