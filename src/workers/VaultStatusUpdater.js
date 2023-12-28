import { getStatus } from '../services/InscriptionService'
import { sleep } from '../services/sleep'
import EmblemVaultApi from '../apis/EmblemVaultApi'

class VaultStatusUpdater {
  static create() {
    return new VaultStatusUpdater()
  }

  /**
   * @private
   */
  constructor() {
    /**
     * @type {StoreInscriptions}
     */
    this.inscriptions

    /**
     * @type {string[]}
     */
    this.storeIdsWhitelist = []

    /**
     * Interval between each API call, in milliseconds
     */
    this.loopInterval = 1000

    this.emblemVaultApi = EmblemVaultApi.create()
  }

  /**
   * @param {StoreInscriptions} inscriptions
   * @returns {Promise<void>}
   */
  async start(inscriptions) {
    console.info('Starting vault status updater...')
    this.inscriptions = inscriptions
    for (;;) {
      await this.#startVaultStatusChecker()
      await sleep(this.loopInterval)
    }
  }

  /**
   * A list of inscriptions store ids to be updated
   * If not set, all inscriptions will be updated
   *
   * @param {string[]} whitelist
   */
  setStoreIdsWhitelist(whitelist) {
    /** @type {string[]} */
    this.storeIdsWhitelist = whitelist
  }

  /**
   * @returns {Promise<void>}
   */
  async #startVaultStatusChecker() {
    for (const inscriptionStoreId in this.inscriptions.value) {
      try {
        if (this.storeIdsWhitelist.length && !this.storeIdsWhitelist.includes(inscriptionStoreId)) continue
        const inscription = this.inscriptions.value[inscriptionStoreId]
        const status = getStatus(inscription)
        if (status === 'readyToClaim') await this.#checkIfInscriptionWasClaimed(inscription)
      } catch (error) {
        console.error(error)
      } finally {
        await sleep(this.loopInterval)
      }
    }
  }

  /**
   * @param {Inscription} inscription
   * @returns {Promise<void>}
   */
  async #checkIfInscriptionWasClaimed(inscription) {
    console.info(`Checking vault ${inscription.vaultTokenId} was claimed...`)
    const { status } = await this.emblemVaultApi.getVaultStatus(inscription.vaultTokenId)
    console.info(`Vault ${inscription.vaultTokenId} status was ${status}!`)
    inscription.vaultStatus = status
  }
}

export default VaultStatusUpdater
