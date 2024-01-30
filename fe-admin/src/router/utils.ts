import { getToken } from '@core/utils/auth'

export const WHITE_LIST_ROUTE = [
  'login', 'register', 'active-account-token',
] as string[]

export const isUserLoggedIn = () => !!getToken()
