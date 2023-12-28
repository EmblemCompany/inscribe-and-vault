interface CreateOrderResponse {
  data: {
    charge: {
      id: string
      hosted_checkout_url: string
      status: OrderChargeStatuses
    }
  }
}
