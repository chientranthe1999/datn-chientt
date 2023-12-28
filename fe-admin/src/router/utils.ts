import { getToken } from '@core/utils/auth'

export const isUserLoggedIn = () => !!getToken()
