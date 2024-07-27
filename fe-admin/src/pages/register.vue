<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { RegisterResponse } from '@/@fake-db/types'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-register-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { alphaDashValidator, emailValidator, requiredValidator } from '@validators'

const refVForm = ref<VForm>()

const registerData = reactive({
  username: '',
  email: '',
  password: '',
  rePassword: '',
  avt: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)

const username = ref('')
const email = ref('')
const password = ref('')
const privacyPolicies = ref(true)

// Router
const route = useRoute()
const router = useRouter()

// Form Errors
const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})

const register = () => {
  axios.post<RegisterResponse>('/auth/register', {
    ...registerData,
  })
    .then(r => {
      const { accessToken, userData } = r.data

      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('accessToken', JSON.stringify(accessToken))

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : '/')

      return null
    })
    .catch(e => {
      const { errors: formErrors } = e.response.data

      errors.value = formErrors
      console.error(e.response.data)
    })
}

const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid)
        register()
    })
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
              <ImageUpload rounded class="mb-2" />
              <p class="text-x">Upload your avt here</p>
            </div>

            <VTextField
              v-model="registerData.username"
              :rules="[requiredValidator, alphaDashValidator]"
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
                v-model="privacyPolicies"
                inline
              />
              <VLabel
                for="privacy-policy"
                style="opacity: 1;"
              >
                <span class="me-1">I agree to</span>
                <a class="text-primary">privacy policy & terms</a>
              </VLabel>
            </div>

            <VBtn block type="submit" class="mb-4">Sign up</VBtn>

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
