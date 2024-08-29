import Cookies from 'js-cookie'

export const AUTH_TOKEN_KEY = 'PERSONAL_MANAGER_APP'
export const TOKEN_TYPE = 'Bearer'

export const getToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY)
}
export const setToken = (token: string) => {
  return Cookies.set(AUTH_TOKEN_KEY, token)
}

export const removeToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY)
}
