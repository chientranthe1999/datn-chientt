<script lang="ts">
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
} from 'vue'
import { CreateSnackbarKey } from './useSnackbar'
import type { CreateSnackbarOptions } from './useSnackbar'

export default defineComponent({
  setup() {
    const state = reactive({
      show: false,
      text: '',
      options: {
        showCloseButton: true,
        closeButtonColor: '',
        timeout: 3000,
        color: 'success',
      } as CreateSnackbarOptions,
    })

    const createSnackbar = (
      text: string,
      options: CreateSnackbarOptions = {},
    ) => {
      state.show = true
      state.text = text
      state.options = Object.assign(state.options, options)
    }

    provide(CreateSnackbarKey, createSnackbar)

    return {
      ...toRefs(state),
    }
  },
})
</script>

<template>
  <div>
    <slot />
    <VSnackbar v-model="show" :timeout="options.timeout" location="top" :color="options.color">
      {{ text }}
    </VSnackbar>
  </div>
</template>
