import BaseCurlApi from '@/api/base.api'

class TransactionsApi extends BaseCurlApi {
  constructor() {
    super('transactions')
  }
}

export const transactionApi = new TransactionsApi()
