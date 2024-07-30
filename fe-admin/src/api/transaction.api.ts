import BaseCurlApi from '@/api/base.api'

export default class TransactionApi extends BaseCurlApi {
  constructor() {
    super('transactions')
  }
}
