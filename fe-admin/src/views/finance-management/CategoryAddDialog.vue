<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { CATEGORY_TYPE, HTTP_STATUS } from '@/constants/common'
import { getListIcon } from '@core/utils'
import { categoriesApi } from '@/api/categories.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { requiredValidator } from '@validators'

const emit = defineEmits(['closeModal'])

const isDialogVisible = ref(false)

const defaultState = {
  group_id: null,
  type: null,
  name: '',
  icon: 'cate-default',
  report_exclude: false,
}

const loading = ref(false)

const formData = reactive({
  ...defaultState,
})

const parentCategories = ref([])

const { errorNotify, successNotify } = useSnackbar()
const { t } = useI18n()
let icons: string[] = []

const getParentCategory = async () => {
  const res = await categoriesApi.getOptions({ only_parent: true })
  if (res.status === HTTP_STATUS.OK)
    parentCategories.value = res.data.items || []
}

const handleDialogClose = (needUpdateData = false) => {
  isDialogVisible.value = false
  Object.assign(formData, defaultState)
  emit('closeModal', needUpdateData)
}

const handleAddCategory = async (validate: SubmitEventPromise) => {
  const result = await validate

  if (result.valid) {
    try {
      loading.value = true

      await categoriesApi.save({ ...formData })

      successNotify(t('category.add_success'))
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

const handleGroupIdChange = (value: number | null) => {
  formData.group_id = value
  if (value)
    formData.type = parentCategories.value.find(item => item.id === value)?.type
}

onMounted(() => {
  icons = getListIcon('category', 'cate')
})

watch(isDialogVisible, async val => {
  if (val)
    await getParentCategory()
})
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props" prepend-icon="tabler-plus" size="small">
        {{ t('category.add') }}
      </VBtn>
    </template>

    <DialogCloseBtn @click="handleDialogClose" />

    <VCard :title="t('category.add_title')">
      <VForm @submit.prevent="handleAddCategory">
        <VCardText>
          <VRow>
            <VCol cols="6">
              <VSelect
                :model-value="formData.group_id"
                :items="parentCategories"
                item-title="name"
                item-value="id"
                :label="t('category.parent')"
                clearable
                @update:model-value="handleGroupIdChange"
              />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="formData.type"
                :items="Object.values(CATEGORY_TYPE)"
                item-title="label"
                item-value="value"
                :label="t('category.type')"
                :rules="[requiredValidator]"
                :disabled="!!formData.group_id"
              />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formData.name" :label="t('category.name')" :rules="[requiredValidator]" />
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
            Close
          </VBtn>
          <VBtn type="submit" :loading="loading">Save</VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

