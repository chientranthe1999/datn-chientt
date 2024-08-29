<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { getListIcon } from '@core/utils'
import { walletsApi } from '@/api/wallets.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { integerValidator, minIntegerValidator, requiredValidator } from '@validators'

const emit = defineEmits(['closeModal'])

const isDialogVisible = ref(false)

// TODO: mask input
const defaultState = {
  group_id: null,
  name: '',
  description: '',
  total: 100000,
  icon: 'wallet-default',
  report_exclude: false,
}

const loading = ref(false)

const formData = reactive({
  ...defaultState,
})

const { t } = useI18n()
let icons: string[] = []

const handleDialogClose = (needUpdateData = false) => {
  isDialogVisible.value = false
  Object.assign(formData, defaultState)
  emit('closeModal', needUpdateData)
}

const { successNotify, errorNotify } = useSnackbar()

const handleSubmit = async (validate: SubmitEventPromise) => {
  const result = await validate

  if (result.valid) {
    try {
      loading.value = true

      await walletsApi.save({ ...formData })

      successNotify(t('wallet.add_success'))
      handleDialogClose(true)
    }
    catch (e) {
      errorNotify(t('message.exception'))
    }
    finally {
      loading.value = false
    }
  }
}

onMounted(() => {
  icons = getListIcon('wallet', '')
})
</script>`

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props" prepend-icon="tabler-plus" size="small">
        {{ t('wallet.add') }}
      </VBtn>
    </template>

    <DialogCloseBtn @click="handleDialogClose" />

    <VCard :title="t('wallet.add_title')">
      <VForm @submit.prevent="handleSubmit">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField v-model="formData.name" :label="t('wallet.name')" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12">
              <VTextarea v-model="formData.description" :label="t('wallet.description')" />
            </VCol>
            <VCol cols="6">
              <VTextField v-model="formData.total" :label="t('wallet.total')" :rules="[requiredValidator, integerValidator, minIntegerValidator(formData.total, 100000)]" />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="formData.icon"
                :items="icons"
                :label="t('icon')"
                :prepend-inner-icon="formData.icon"
                :menu-props="{ maxWidth: 250 }"
              >
                <template #item="{ props }">
                  <VBtn density="compact" :icon="props.value as string" v-bind="props" class="mx-1 mb-1" />
                </template>
              </VSelect>
            </VCol>
            <VCol cols="6">
              <VCheckbox v-model="formData.report_exclude" :label="$t('finance.exclude_report')" />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn
            variant="tonal"
            color="secondary"
            :loading="loading"
            @click="handleDialogClose"
          >
            {{ t('btn.cancel') }}
          </VBtn>
          <VBtn type="submit" :loading="loading">{{ t('btn.save') }}</VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

