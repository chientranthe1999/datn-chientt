<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { SubmitEventPromise } from 'vuetify'
import { AxiosError } from 'axios'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-register-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { emailValidator, requiredValidator } from '@validators'
import { register } from '@/api/auth'
import { HTTP_STATUS } from '@/constants/common'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'

const registerData = reactive({
  name: '',
  email: '',
  password: '',
  rePassword: '',
  avt: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref<boolean>(false)
const imageRef = ref()

const router = useRouter()

const createSnackbar = useSnackbar()
const loading = ref(false)
const { t } = useI18n()

const registerHandler = async () => {
  registerData.avt = await imageRef.value.upload('avt')
  try {
    loading.value = true

    const result = await register({ ...registerData })
    if (result.status === HTTP_STATUS.OK) {
      createSnackbar(t('message.register_success'), { color: 'success' })
      await router.push({ name: 'login' })
    }
  }
  catch (error) {
    if (error instanceof AxiosError && error?.response?.status === HTTP_STATUS.VALIDATION_ERR)
      createSnackbar(error.response.data.message, { color: 'error' })

    else createSnackbar(t('message.exception'), { color: 'error' })
  }
  finally {
    loading.value = false
  }
}

const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const onSubmit = async (validate: SubmitEventPromise) => {
  const result = await validate
  if (result.valid)
    await registerHandler()
}
</script>

<template>
  <VRow no-gutters class="auth-wrapper">
    <VCol lg="6" class="d-none d-lg-flex">
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="441"
            :src="imageVariant"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol cols="12" lg="6" class="d-flex align-center justify-center">
      <VCard :max-width="500" class="mt-12 mt-sm-0 pa-4" flat>
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6 w-25"
          />
          <h5 class="text-h5 font-weight-semibold mb-1">
            Adventure starts here 🚀
          </h5>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <div class="mb-4">
              <ImageUpload ref="imageRef" rounded class="mb-2" />
              <p class="text-x">Upload your avt here</p>
            </div>

            <VTextField
              v-model="registerData.name"
              :rules="[requiredValidator]"
              label="Enter your name"
              :hide-details="false"
              class="mb-3"
            />

            <!-- email -->
            <VTextField
              v-model="registerData.email"
              :rules="[requiredValidator, emailValidator]"
              label="Email"
              type="email"
              :hide-details="false"
              class="mb-3"
            />

            <!-- password -->
            <VTextField
              v-model="registerData.password"
              :rules="[requiredValidator]"
              label="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              :hide-details="false"
              class="mb-3"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />

            <!-- password -->
            <VTextField
              v-model="registerData.rePassword"
              :rules="[requiredValidator]"
              label="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              :hide-details="false"
              class="mb-3"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />

            <div class="d-flex align-center mt-2 mb-4">
              <VCheckbox
                id="privacy-policy"
                v-model="registerData.privacyPolicies"
                :rules="[requiredValidator]"
              >
                <template #label>
                  <div>
                    <span class="me-1">I agree to</span>
                    <a class="text-primary">privacy policy & terms</a>
                  </div>
                </template>
              </VCheckbox>
            </div>

            <VBtn block type="submit" class="mb-4" :loading="loading">{{ t('sign_up') }}</VBtn>

            <VRow>
              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
