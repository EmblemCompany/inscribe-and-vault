interface GetOrderStatusResponseFile {
  /**
   * The inscription transaction hash
   */
  sent: string
  processing: boolean
  tx: {
    inscription: string
  }
}

interface GetOrderStatusResponse {
  data: {
    paid: boolean
    processing: boolean
    files: GetOrderStatusResponseFile[]
  }
}
