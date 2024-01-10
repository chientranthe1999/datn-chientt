import { defineStore } from 'pinia'
import { logout } from '@/api/auth'
import { HTTP_STATUS } from '@/constants/common'
import { removeToken } from '@core/utils/auth'

interface UserInfo {
  name: string
  email: string
  avt?: string
  role?: string
  id: number
}

const userStore = defineStore('UserStore', {
  state: () => {
    return {
      token: '',
      userInfo: {} as UserInfo,
    }
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },

    setToken(token: string) {
      this.token = token
    },

    async logout() {
      try {
        const res = await logout()
        if (res.status === HTTP_STATUS.OK) {
          this.userInfo = {} as UserInfo
          this.token = ''
          removeToken()
        }
      }
      catch (e) {
        this.userInfo = {} as UserInfo
        this.token = ''
        removeToken()
      }
    },
  },
})

const useUserStore = userStore()

export { useUserStore }
