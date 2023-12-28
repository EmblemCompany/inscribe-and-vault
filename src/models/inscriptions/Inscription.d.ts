interface Inscription {
  /** Used internally as a store uid */
  storeId: string
  /** Used internally for localstorage store migrations purposes */
  storeVersion: number
  id?: string
  name?: string
  description?: string
  toAddress?: string
  vaultTaprootAddress?: string
  vaultTokenId?: string
  vaultNetwork?: string
  vaultImage?: InscriptionFile
  vaultStatus?: VaultStatuses
  inscriptionFile?: InscriptionFile
  inscriptionTxHash?: string
  inscriptionFileSize?: number
  inscriptionOrderId?: string
  inscriptionOrderCheckoutUrl?: string
  inscriptionOrderStatus?: keyof typeof OrderChargeStatuses
}
