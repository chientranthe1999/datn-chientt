<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components'

import type { UserProperties } from '@/@fake-db/types'
import { requiredValidator } from '@validators'
import { TASK_PRIORITY } from '@/constants/common'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'userData', value: UserProperties): void
}

interface Props {
  isDrawerOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()

const task = reactive({
  title: '',
  role: '',
  description: '',
  priority: '',
  start_date: '',
  end_date: '',
  label: '',
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        fullName: fullName.value,
        company: company.value,
        role: role.value,
        country: country.value,
        contact: contact.value,
        email: email.value,
        currentPlan: plan.value,
        status: status.value,
        avatar: '',
        billing: 'Auto Debit',
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="480"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <div class="d-flex pa-6 pb-1 align-center">
      <VSelect
        variant="outlined"
        class="custom-select"
        :items="['Backlog', 'In Progress', 'Review', 'Done']"
      />

      <VBtn
        density="compact" icon="tabler-trash-filled" variant="text" color="error"
      />
    </div>
    <VDivider class="my-4" />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VTextField
              v-model="task.title"
              :rules="[requiredValidator]"
              :label="$t('task.title')"
              :hide-details="false"
              density="compact"
              class="mb-2"
            />

            <VSelect
              v-model="task.label"
              :label="$t('task.label')"
              :rules="[requiredValidator]"
              :items="['Design', 'Backend', 'Feature Request', 'QA']"
              :hide-details="false"
              clearable
              class="mb-2"
              chips
            />

            <div class="mb-4">
              <Calendar v-model:datetime="task.start_date" label="Start date" />
            </div>
            <div class="mb-2">
              <Calendar v-model:datetime="task.end_date" label="End date" />
            </div>

            <VRadioGroup v-model="task.priority" class="mb-4">
              <template #label>
                <div>Priority</div>
              </template>

              <div class="d-flex">
                <VRadio v-for="(val, key) in TASK_PRIORITY" :key="key" :value="val">
                  <template #label>
                    <VChip :prepend-icon="val.icon" :color="val.color">{{ val.text }}</VChip>
                  </template>
                </VRadio>
              </div>
            </VRadioGroup>

            <VTextarea
              v-model="task.description"
              label="Description"
              :rules="[requiredValidator]"
              :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
              :hide-details="false"
              class="mb-4"
            />

            <VBtn size="small" type="submit" class="me-3"> {{ $t("btn.save") }} </VBtn>
            <VBtn
              type="reset"
              variant="tonal"
              color="secondary"
              size="small"
              @click="closeNavigationDrawer"
            >
              {{ $t("btn.cancel") }}
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss" scoped>
:deep(.custom-select .v-input__control) {
  width: 180px;
}
</style>
