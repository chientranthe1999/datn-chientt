import type { AxiosResponse } from 'axios'
import BaseCurlApi from '@/api/base.api'
import request from '@axios'

class CategoriesApi extends BaseCurlApi {
  constructor() {
    super('categories')
  }

  getTree(): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/tree`)
  }
}

export const categoriesApi = new CategoriesApi()
