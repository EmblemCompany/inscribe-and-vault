interface VaultCreationResponseDataAddress {
  path: string
  address: string
  coin: string
}

interface VaultCreationResponse {
  data: {
    /**
     * API call status
     */
    status: 'success' | 'error'
    /**
     * API call status description
     */
    message: string
    data: {
      addresses: VaultCreationResponseDataAddress[]
      tokenId: string
      /**
       * eg: mainnet
       */
      network: string
    }
  }
}
