/**
 * @param {string} address
 * @returns {string}
 */
export const getEthereumAddressExplorerUrl = (address) => {
  return `https://etherscan.io/address/${address}`
}

/**
 * @param {string} inscriptionId
 * @returns {string}
 */
export const getInscriptionExplorerUrl = (inscriptionId) => {
  return `https://ordinals.com/inscription/${inscriptionId}`
}

/**
 * @param {string} address
 * @returns {string}
 */
export const getBitcoinAddressExplorerUrl = (address) => {
  return `https://mempool.space/address/${address}`
}

/**
 * @param {string} txHash
 * @returns {string}
 */
export const getBitcoinTxExplorerUrl = (txHash) => {
  return `https://mempool.space/tx/${txHash}`
}
