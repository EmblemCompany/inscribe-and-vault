/**
 * @type {(inscription: Inscription) => keyof typeof InscriptionStatuses}
 */
export const getStatus = (inscription) => {
  if (!inscription) return 'created'

  if (inscription.vaultStatus) {
    if (inscription.vaultStatus === 'unclaimed') return 'readyToClaim'
    if (inscription.vaultStatus === 'claimed') return 'claimed'
  }

  if (inscription.inscriptionOrderId && inscription.inscriptionOrderCheckoutUrl && inscription.inscriptionOrderStatus) {
    if (inscription.inscriptionOrderStatus === 'paid') {
      if (inscription.id) return 'readyToClaim'
      return 'processingInscription'
    }
    if (inscription.inscriptionOrderStatus === 'expired') return 'inscriptionOrderExpired'
    return 'inscriptionOrderCreated'
  }

  if (inscription.vaultTaprootAddress && inscription.vaultTokenId) return 'vaultCreated'
  return 'created'
}

/**
 * @type {(inscription: Inscription) => string | null}
 */
export const getOrdinalsBotOrder = (inscription) => {
  if (!inscription.inscriptionOrderCheckoutUrl) return null
  return inscription.inscriptionOrderCheckoutUrl.split('/').pop()
}
