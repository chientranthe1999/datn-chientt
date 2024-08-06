import type { AxiosResponse } from 'axios'
import BaseCurlApi from '@/api/base.api'
import request from '@axios'

class WalletsApi extends BaseCurlApi {
  constructor() {
    super('wallets')
  }
}

export const walletsApi = new WalletsApi()
