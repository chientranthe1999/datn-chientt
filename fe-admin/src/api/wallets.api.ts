import type { AxiosResponse } from 'axios'
import BaseCurlApi from '@/api/base.api'
import request from '@axios'

class WalletsApi extends BaseCurlApi {
  constructor() {
    super('wallets')
  }

  getOptions(params: Record<string, unknown>): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/options`, params)
  }
}

export const walletsApi = new WalletsApi()
