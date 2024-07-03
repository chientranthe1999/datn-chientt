import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { TOKEN_TYPE, getToken } from '@core/utils/auth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token)
      (config.headers || {}).Authorization = `${TOKEN_TYPE} ${token}`

    return config
  },

  (error: AxiosError) => {
    console.log(error.response)
  },
)

export default axiosInstance
