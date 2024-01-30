<script setup>
import { activeAccount } from '@/api/auth'

const route = useRoute()
const { t } = useI18n()

const isSuccess = ref(true)
const errorMessage = ref('')

const activeAccountHandler = async () => {
  const token = route.params.token
  if (!token) {
    isSuccess.value = false

    return
  }

  try {
    const result = await activeAccount(token)
  }
  catch (e) {
    errorMessage.value = e.response?.data.message || t(`active_account.${e.response?.data?.errors?.code?.toLowerCase()}`)
    isSuccess.value = false
  }
}

// activeAccountHandler()
</script>

<template>
  <VCard class="message-container">
    <VCardText v-if="isSuccess">
      <img src="@/assets/images/icons/common/checked.png" alt="success icon">
      <h3 class="text-success py-2 message-text">Active Account Successfully</h3>
      <p>Welcome to our community. Click "Login" to join</p>
      <VBtn>
        <RouterLink
          class="text-white"
          :to="{ name: 'login' }"
        >
          Login
        </RouterLink>
      </VBtn>
    </VCardText>

    <VCardText v-else>
      <p>{{ errorMessage }}</p>
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

