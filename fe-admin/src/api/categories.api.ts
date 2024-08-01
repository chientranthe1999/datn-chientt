import type { AxiosResponse } from 'axios'
import BaseCurlApi from '@/api/base.api'
import request from '@axios'

class CategoriesApi extends BaseCurlApi {
  constructor() {
    super('categories')
  }

  getOptions(params: Record<string, unknown>): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/options`, params)
  }

  getTree(): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/tree`)
  }
}

export const categoriesApi = new CategoriesApi()
