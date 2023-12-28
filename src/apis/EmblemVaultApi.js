import Axios from 'axios'
import { ChainIds } from '../enums/emblemVault/ChainIds'

class EmblemVaultApi {
  static create() {
    return new EmblemVaultApi()
  }

  /**
   * @private
   */
  constructor() {
    this.chainId = ChainIds.mainnet
  }

  /**
   * @param {VaultCreationPayload} payload
   * @returns {Promise<VaultCreationResponse>}
   */
  async createVault(payload) {
    return Axios.post('https://api.emblemvault.io/mint3', { ...payload, chainId: this.chainId })
  }

  /**
   * @param {string} tokenId
   * @returns {Promise<{status: VaultStatuses}>}
   */
  async getVaultStatus(tokenId) {
    return Axios.post(`https://api.emblemvault.io/meta/${tokenId}`)
  }
}

export default EmblemVaultApi
