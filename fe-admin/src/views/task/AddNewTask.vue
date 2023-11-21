<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components'

import type { UserProperties } from '@/@fake-db/types'
import { requiredValidator } from '@validators'

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
const fullName = ref('')
const email = ref('')
const company = ref('')
const country = ref('')
const contact = ref('')
const role = ref()
const plan = ref()
const status = ref()

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
    temporary="true"
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
        :items="[10, 20, 30, 50]"
      />

      <VBtn
        density="compact" icon="tabler-trash-filled" variant="text" color="error"
      />
    </div>
    <VDivider class="my-4" />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VTextField
              v-model="fullName"
              :rules="[requiredValidator]"
              :label="$t('task.title')"
              :hide-details="false"
              density="compact"
              class="mb-2"
            />

            <VSelect
              v-model="role"
              :label="$t('task.label')"
              :rules="[requiredValidator]"
              :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
              :hide-details="false"
              clearable="true"
              class="mb-2"
              chips
            />

            <VRadioGroup class="mb-4">
              <template #label>
                <div>Priority</div>
              </template>

              <div class="d-flex">
                <VRadio value="High">
                  <template #label>
                    <VChip prepend-icon="tabler-arrow-badge-up" color="error">High</VChip>
                  </template>
                </VRadio>
                <VRadio value="Medium">
                  <template #label>
                    <VChip prepend-icon="tabler-menu" color="success">Medium</VChip>
                  </template>
                </VRadio>

                <VRadio value="Low">
                  <template #label>
                    <VChip prepend-icon="tabler-chevron-down" color="primary">Low</VChip>
                  </template>
                </VRadio>
              </div>
            </VRadioGroup>

            <VTextarea
              v-model="role"
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
