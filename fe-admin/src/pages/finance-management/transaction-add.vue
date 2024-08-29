<script setup lang="ts">
import { integerValidator, requiredValidator } from '@validators'
import { transactionApi } from '@/api/transactions.api'
import { walletsApi } from '@/api/wallets.api'
import { categoriesApi } from '@/api/categories.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { formatDate } from '@core/utils/formatters'

const wallets = ref([])
const categories = ref([])
const { successNotify, errorNotify } = useSnackbar()
const { t } = useI18n()
const router = useRouter()

const formData = reactive({
  amount: '',
  category_id: '',
  wallet_id: '',
  note: '',
  action_time: formatDate(new Date()),
  excludeReport: false,
})

const imageUploader = ref()
const loading = ref<boolean>(false)

const getOptions = async () => {
  try {
    const [walletRes, categoryRes] = await Promise.all([walletsApi.getOptions(), categoriesApi.getOptions()])

    wallets.value = walletRes?.data?.items || []
    categories.value = categoryRes?.data?.items || []
  }
  catch (e) {
    console.log(e)
  }
}

getOptions()

const addNewTransaction = async () => {
  try {
    loading.value = true

    const imageUrl = await imageUploader.value.upload('transactions')

    await transactionApi.save({ ...formData, image: imageUrl })
    successNotify(t('transaction.add_success'))
    await router.push({ name: 'finance-management-transactions' })
  }
  catch (e) {
    errorNotify(e.message || e.response?.data?.message)
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
              item-title="name"
              item-value="id"
              :items="categories"
            />
          </VCol>

          <VCol cols="6">
            <VSelect
              v-model="formData.wallet_id"
              :label="$t('common.wallet')"
              :rules="[requiredValidator]"
              :hide-details="false"
              item-title="name"
              item-value="id"
              :items="wallets"
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
