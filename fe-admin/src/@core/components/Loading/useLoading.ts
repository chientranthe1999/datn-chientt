import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export interface CreateSnackbarOptions {
  showCloseButton?: boolean
  closeButtonColor?: string
  timeout?: number
  color?: 'success' | 'error' | 'info'
}

export type Loading = (
  loading: boolean,
) => void

export const LoadingKey: InjectionKey<Loading>
  = Symbol('Loading')

export function useLoading() {
  const setLoading = inject(LoadingKey)

  if (!setLoading)
    throw new Error('Could not resolve loading provider')

  return setLoading
}
