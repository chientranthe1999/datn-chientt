import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export interface CreateSnackbarOptions {
  showCloseButton?: boolean
  closeButtonColor?: string
  timeout?: number
  color?: 'success' | 'error' | 'info'
}

export type CreateSnackbar = (
  text: string,
  options?: CreateSnackbarOptions
) => void

export const CreateSnackbarKey: InjectionKey<CreateSnackbar>
  = Symbol('CreateSnackbar')

export function useSnackbar() {
  const createSnackbar = inject(CreateSnackbarKey)

  if (!createSnackbar)
    throw new Error('Could not resolve snackbar provider')

  const successNotify = (text: string, options?: CreateSnackbarOptions) => {
    createSnackbar(text, { ...options, color: 'success' })
  }

  const errorNotify = (text: string, options?: CreateSnackbarOptions) => {
    createSnackbar(text, { ...options, color: 'error' })
  }

  return { createSnackbar, errorNotify, successNotify }
}
