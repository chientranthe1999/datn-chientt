import { getToken } from '@core/utils/auth'

export const WHITE_LIST_ROUTE = [
  'login', 'register',
] as string[]

export const isUserLoggedIn = () => !!getToken()
