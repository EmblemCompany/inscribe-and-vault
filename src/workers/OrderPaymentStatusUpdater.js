import { getStatus } from '../services/InscriptionService'
import { sleep } from '../services/sleep'
import OrdinalsBotApi from '../apis/OrdinalsBotApi'

class OrderPaymentStatusUpdater {
  static create() {
    return new OrderPaymentStatusUpdater()
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

    this.ordinalsBotApi = OrdinalsBotApi.create()
  }

  /**
   * @param {StoreInscriptions} inscriptions
   * @returns {Promise<void>}
   */
  async start(inscriptions) {
    console.info('Starting inscriptions orders payment status updater...')
    this.inscriptions = inscriptions
    for (;;) {
      await this.#startOrderPaymentStatusChecker()
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
  async #startOrderPaymentStatusChecker() {
    for (const inscriptionStoreId in this.inscriptions.value) {
      try {
        if (this.storeIdsWhitelist.length && !this.storeIdsWhitelist.includes(inscriptionStoreId)) continue
        const inscription = this.inscriptions.value[inscriptionStoreId]
        const status = getStatus(inscription)
        if (['inscriptionOrderCreated', 'processingInscription'].includes(status)) {
          await this.#checkIfInscriptionWasPaid(inscription)
        }
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
  async #checkIfInscriptionWasPaid(inscription) {
    console.info(`Checking if order ${inscription.inscriptionOrderId} was paid...`)

    const {
      data: { paid, processing, files },
    } = await this.ordinalsBotApi.getOrderStatus(inscription.inscriptionOrderId)

    console.info(`${inscription.inscriptionOrderId} - paid: ${paid}, processing: ${processing}`)

    if (paid) inscription.inscriptionOrderStatus = 'paid'

    const file = files[0]

    if (!file) return

    const { sent, tx } = file

    if (!inscription.inscriptionTxHash && sent) inscription.inscriptionTxHash = files[0].sent
    if (!inscription.id && tx?.inscription) inscription.id = tx.inscription
  }
}

export default OrderPaymentStatusUpdater
