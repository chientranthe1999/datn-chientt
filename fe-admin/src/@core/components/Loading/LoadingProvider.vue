<script lang="ts" setup>
import { LoadingKey } from '@core/components/Loading/useLoading'

const dialog = ref(false)

const setLoading = (loading: boolean) => {
  dialog.value = loading
}

provide(LoadingKey, setLoading)
</script>

<template>
  <section>
    <slot />
  </section>
  <VDialog
    v-model="dialog"
    max-width="320"
    persistent
  >
    <VList
      class="py-2"
      color="primary"
      elevation="12"
      rounded="lg"
    >
      <VListItem
        prepend-icon="$vuetify-outline"
        title="Loading..."
      >
        <template #prepend>
          <div class="pe-4">
            <VIcon color="primary" size="x-large" />
          </div>
        </template>

        <template #append>
          <VProgressCircular
            color="primary"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          />
        </template>
      </VListItem>
    </VList>
  </VDialog>
</template>

