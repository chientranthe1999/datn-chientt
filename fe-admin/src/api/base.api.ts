import type { AxiosResponse } from 'axios'
import request from '@axios'

export default class BaseCurlApi {
  protected readonly baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = `api_admin/${baseUrl}`
  }

  get(params: unknown): Promise<unknown> {
    return request.post(this.baseUrl, params)
  }

  getAll(): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/get-all`)
  }

  getById(id: number): Promise<unknown> {
    return request.get(`${this.baseUrl}/${id}`)
  }

  save(data: unknown): Promise<unknown> {
    return request.post(this.baseUrl, data)
  }

  update(id: number, data: unknown): Promise<unknown> {
    return request.put(`${this.baseUrl}/${id}`, data)
  }

  delete(id: number): Promise<unknown> {
    return request.delete(`${this.baseUrl}/${id}`)
  }
}
