import type { AxiosResponse } from 'axios'
import request from '@axios'

class ReportApi {
  protected readonly baseUrl: string

  constructor() {
    this.baseUrl = 'api_admin/report'
  }

  getReport(): Promise<AxiosResponse> {
    return request.get(`${this.baseUrl}/finance`)
  }
}

export const reportApi = new ReportApi()
