<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { CATEGORY_TYPE, HTTP_STATUS } from '@/constants/common'
import { getListIcon } from '@core/utils'
import { categoriesApi } from '@/api/categories.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { requiredValidator } from '@validators'

const props = defineProps({
  category: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['closeModal'])
const isOpenDialog = ref(true)

const defaultState = {
  group_id: null,
  type: null,
  name: '',
  icon: 'cate-default',
  report_exclude: false,
}

const loading = ref(false)

const formData = reactive(props.category
  ? { ...props.category }
  : { ...defaultState })

const parentCategories = ref([])

const { t } = useI18n()
let icons: string[] = []

const getParentCategory = async () => {
  const res = await categoriesApi.getOptions({ only_parent: true })
  if (res.status === HTTP_STATUS.OK)
    parentCategories.value = res.data.items || []
}

const handleDialogClose = (needUpdateData = false) => {
  emit('closeModal', needUpdateData)
}

const { errorNotify, successNotify } = useSnackbar()

const handleEditCategory = async (validate: SubmitEventPromise) => {
  const result = await validate

  if (result.valid) {
    try {
      loading.value = true

      await categoriesApi.update(props.category.id, { ...formData })

      successNotify(t('category.edit_success'))
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

getParentCategory()

onMounted(() => {
  icons = getListIcon('category', 'cate')
})
</script>

<template>
  <VDialog
    v-model="isOpenDialog"
    max-width="600"
  >
    <DialogCloseBtn @click="handleDialogClose" />

    <VCard :title="t('category.edit_title')">
      <VForm @submit.prevent="handleEditCategory">
        <VCardText>
          <VRow>
            <VCol cols="6">
              <VSelect
                v-model="formData.group_id"
                :items="parentCategories"
                item-title="name"
                item-value="id"
                :label="t('category.parent')"
                clearable
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

