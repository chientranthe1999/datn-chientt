<script setup lang="ts">
import { integerValidator, requiredValidator } from '@validators'
import { transactionApi } from '@/api/transactions.api'

const formatDate = (date: Date = new Date()) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

const formData = reactive({
  amount: '',
  category_id: '',
  wallet_id: '',
  note: '',
  action_time: formatDate,
  excludeReport: false,
})

const imageUploader = ref()
const loading = ref<boolean>(false)

const addNewTransaction = async () => {
  try {
    loading.value = true

    const imageUrl = await imageUploader.value.upload('transactions')

    const result = await transactionApi.save({ ...formData, image: imageUrl })
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <VCard :title="$t('finance.transaction_add_title')">
    <VDivider />
    <VCardText title="Add a new transaction">
      <VForm @submit.prevent>
        <VRow>
          <VCol cols="6">
            <VTextField
              v-model="formData.amount"
              :label="$t('common.amount')"
              :rules="[requiredValidator, integerValidator]"
              :hide-details="false"
              suffix="$"
            />
          </VCol>
          <VCol cols="6">
            <VSelect
              v-model="formData.category_id"
              :label="$t('common.category')"
              :rules="[requiredValidator]"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <VSelect
              v-model="formData.wallet_id"
              :label="$t('common.wallet')"
              :rules="[requiredValidator]"
              :hide-details="false"
            />
          </VCol>

          <VCol cols="6">
            <Calendar v-model:datetime="formData.action_time" />
          </VCol>

          <VCol cols="12">
            <VTextarea :label="$t('common.note')" />
          </VCol>
          <VCol cols="12">
            <p>{{ $t('finance.image') }}</p>
            <ImageUpload ref="imageUploader" />
          </VCol>
          <VCol cols="12">
            <VCheckbox :label="$t('finance.exclude_report')" />
          </VCol>
        </VRow>

        <VBtn type="submit" class="mt-4" @click="addNewTransaction">
          {{ $t('btn.submit') }}
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>
