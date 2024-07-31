<script lang="ts" setup>
import { CATEGORY_TYPE } from '@/constants/common'
import { getListCategoryIcon } from '@core/utils'

const isDialogVisible = ref(true)

const formData = reactive({
  group_id: '',
  type: '',
  name: '',
  icon: 'cate-default',
  report_exclude: false,
})

const { t } = useI18n()
let icons: string[] = []

onMounted(() => {
  icons = getListCategoryIcon('category', 'cate')
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

    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard :title="t('category.add_title')">
      <VCardText>
        <VForm @submit.prevent>
          <VRow>
            <VCol cols="6">
              <VSelect
                v-model="formData.group_id"
                :items="['0-17', '18-29', '30-54', '54+']"
                :label="t('category.parent')"
              />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="formData.type"
                :items="Object.values(CATEGORY_TYPE)"
                item-title="label"
                item-value="value"
                :label="t('category.type')"
              />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formData.name" :label="t('category.name')" />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="formData.icon"
                :items="icons"
                :label="t('icon')"
              >
                <template #item="{ props }">
                  <div v-bind="props">
                    <VAvatar size="30" :icon="props.value as string" />
                  </div>
                </template>
              </VSelect>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
