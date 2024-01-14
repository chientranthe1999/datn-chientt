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

  return createSnackbar
}
