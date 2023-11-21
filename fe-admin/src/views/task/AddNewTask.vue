<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components'

import type { UserProperties } from '@/@fake-db/types'
import { emailValidator, requiredValidator } from '@validators'

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

      <!-- 👉 Close btn -->
      <!--      <VBtn -->
      <!--        variant="tonal" -->
      <!--        color="default" -->
      <!--        icon -->
      <!--        size="32" -->
      <!--        class="rounded" -->
      <!--        @click="closeNavigationDrawer" -->
      <!--      > -->
      <!--        <VIcon -->
      <!--          size="18" -->
      <!--          icon="tabler-x" -->
      <!--        /> -->
      <!--      </VBTn> -->
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
            />

            <VSelect
              v-model="role"
              :label="$t('task.label')"
              :rules="[requiredValidator]"
              :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
              :hide-details="false"
              clearable="true"
            />

            <VTextField
              v-model="company"
              :rules="[requiredValidator]"
              label="Company"
              :hide-details="false"
              density="compact"
            />

            <VTextField
              v-model="country"
              :rules="[requiredValidator]"
              label="Country"
              density="compact"
              :hide-details="false"
            />

            <VTextField
              v-model="contact"
              type="number"
              :rules="[requiredValidator]"
              label="Contact"
              :hide-details="false"
            />

            <VSelect
              v-model="role"
              label="Select Role"
              :rules="[requiredValidator]"
              :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
              :hide-details="false"
            />

            <VSelect
              v-model="plan"
              label="Select Plan"
              :rules="[requiredValidator]"
              :items="['Basic', 'Company', 'Enterprise', 'Team']"
              :hide-details="false"
            />

            <VSelect
              v-model="status"
              label="Select Status"
              :rules="[requiredValidator]"
              :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }, { title: 'Pending', value: 'pending' }]"
              :hide-details="false"
            />

            <VBtn
              type="submit"
              class="me-3"
            >
              Submit
            </VBtn>
            <VBtn
              type="reset"
              variant="tonal"
              color="secondary"
              @click="closeNavigationDrawer"
            >
              Cancel
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
