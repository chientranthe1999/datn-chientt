import type { AxiosResponse } from 'axios'
import request from '@axios'

export default class BaseCurlApi {
  protected readonly baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = `api_admin/${baseUrl}`
  }

  get(params: unknown = {}): Promise<AxiosResponse> {
    return request.get(this.baseUrl, { params })
  }

  getAll(): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/get-all`)
  }

  getById(id: number | string): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/${id}`)
  }

  save(data: unknown): Promise<AxiosResponse> {
    return request.post(this.baseUrl, data)
  }

  update(id: number, data: unknown): Promise<AxiosResponse> {
    return request.put(`${this.baseUrl}/${id}`, data)
  }

  delete(id: number): Promise<AxiosResponse> {
    return request.delete(`${this.baseUrl}/${id}`)
  }

  getOptions(params: Record<string, unknown> = {}): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/options`, { params })
  }
}
