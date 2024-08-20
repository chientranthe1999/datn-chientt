<script setup lang="ts">
import { integerValidator, requiredValidator } from '@validators'
import { transactionApi } from '@/api/transactions.api'
import { walletsApi } from '@/api/wallets.api'
import { categoriesApi } from '@/api/categories.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { useLoading } from '@core/components/Loading/useLoading'
import { HTTP_STATUS } from '@/constants/common'
import { formatDate } from '@core/utils/formatters'

const wallets = ref([])
const categories = ref([])
const { successNotify } = useSnackbar()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const loading = ref(false)

const formData = reactive({
  amount: '',
  category_id: '',
  wallet_id: '',
  note: '',
  action_time: new Date(),
  excludeReport: false,
  image: '',
})

const imageUploader = ref()

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

const getTransactionById = async () => {
  const result = await transactionApi.getById(route.params.id)

  if (result.status === HTTP_STATUS.OK) {
    const data = result.data

    formData.amount = data.amount
    formData.category_id = data.category_id
    formData.wallet_id = data.wallet_id
    formData.note = data.note
    formData.action_time = formatDate(new Date(data.action_time))
    formData.excludeReport = data.exclude_report
    formData.image = data.image
  }
}

const updateTransaction = async () => {
  try {
    loading.value = true

    const imageUrl = await imageUploader.value.upload('transactions')

    await transactionApi.update(route.params.id, { ...formData, image: imageUrl })
    successNotify(t('transaction.edit_success'))
    await router.push({ name: 'finance-management-transactions' })
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

getOptions()
getTransactionById()
</script>

<template>
  <VCard :title="$t('transaction.edit_title')">
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
            <Calendar v-model:datetime="formData.action_time" :required="false" />
          </VCol>

          <VCol cols="12">
            <VTextarea :label="$t('common.note')" />
          </VCol>
          <VCol cols="12">
            <p>{{ $t('finance.image') }}</p>
            <ImageUpload ref="imageUploader" :url="formData.image" />
          </VCol>
          <VCol cols="12">
            <VCheckbox :label="$t('finance.exclude_report')" />
          </VCol>
        </VRow>

        <VBtn type="submit" class="mt-4" :loading="loading" @click="updateTransaction">
          {{ $t('btn.submit') }}
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>

<route lang="yaml">
name: finance-management-transaction-edit
</route>
