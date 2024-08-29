<script setup>
import { activeAccount } from '@/api/auth'
import { useLoading } from '@core/components/Loading/useLoading'

const route = useRoute()
const { t } = useI18n()

const isSuccess = ref(false)
const errorMessage = ref('')
const setLoading = useLoading()

const activeAccountHandler = async () => {
  const token = route.params.token
  if (!token) {
    isSuccess.value = false

    return
  }

  try {
    setLoading(true)
    await activeAccount(token)
    isSuccess.value = true
  }
  catch (e) {
    isSuccess.value = false
    if (e) {
      errorMessage.value = e.response?.data.message || e.response?.data?.errors?.code
        ? t(`active_account.${e.response?.data?.errors?.code?.toLowerCase()}`)
        : t('message.invalid_link')
    }
  }
  finally {
    setLoading(false)
  }
}

activeAccountHandler()
</script>

<template>
  <VCard class="message-container">
    <VCardText v-if="isSuccess">
      <img src="@/assets/images/common/checked.png" alt="success icon">
      <h3 class="text-success py-2 message-text">Active Account Successfully</h3>
      <p>Welcome to our community. Click "Login" to join</p>
      <VBtn>
        <RouterLink
          class="text-white"
          :to="{ name: 'login' }"
        >
          {{ $t('btn.login') }}
        </RouterLink>
      </VBtn>
    </VCardText>

    <VCardText v-else-if="errorMessage">
      <div class="d-flex justify-center align-center error-message">
        <img src="@/assets/images/common/broken-link.svg" alt="broken link" class="mb-2">
        <p style="font-size: 6em;">Woops!</p>
      </div>
      <p class="message-text">{{ errorMessage }}</p>
      <VBtn>
        <RouterLink to="/" class="text-white">{{ $t('btn.home') }}</RouterLink>
      </VBtn>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.message-container {
  max-width: 50em;
  margin: 15vh auto 0;
  text-align: center;

  img {
    width: 240px;
  }

  .message-text {
    font-size: 1.5em;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

