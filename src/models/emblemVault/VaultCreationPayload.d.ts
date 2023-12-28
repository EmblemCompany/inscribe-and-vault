interface VaultCreationPayload {
  /**
   * @see ChainIds
   */
  chainId?: number
  /**
   * The Ethereum address to which the token will be minted.
   */
  fromAddress: string
  /**
   * The Ethereum address to which the token will be minted.
   */
  toAddress: string
  /**
   * Token name
   */
  name?: string
  /**
   * Token description
   */
  description?: string
  /**
   * URL or base64-encoded image associated with the token (optional)
   */
  image?: string
  /**
   * Stick to default value
   */
  private: boolean
  /**
   * Stick to default value
   */
  password: string
  /**
   * Stick to default value
   */
  values: []
  /**
   * Stick to default value
   */
  experimental: boolean
}
