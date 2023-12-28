import { ref } from 'vue'
import OrderPaymentStatusUpdater from '../workers/OrderPaymentStatusUpdater.js'
import VaultStatusUpdater from '../workers/VaultStatusUpdater.js'

const orderPaymentStatusUpdater = OrderPaymentStatusUpdater.create()
const vaultStatusUpdater = VaultStatusUpdater.create()

const isRunning = ref(false)

/**
 * @param {StoreInscriptions} inscriptions
 */
export default function useInscriptionsStatusesUpdater(inscriptions) {
  const start = async () => {
    if (isRunning.value) return
    isRunning.value = true
    orderPaymentStatusUpdater.start(inscriptions)
    vaultStatusUpdater.start(inscriptions)
  }

  start()

  /**
   * @param {string[]} whitelist
   */
  const setStoreIdsWhitelist = (whitelist) => {
    orderPaymentStatusUpdater.setStoreIdsWhitelist(whitelist)
    vaultStatusUpdater.setStoreIdsWhitelist(whitelist)
  }

  const clearStoreIdsWhitelist = () => {
    orderPaymentStatusUpdater.setStoreIdsWhitelist([])
    vaultStatusUpdater.setStoreIdsWhitelist([])
  }

  return { clearStoreIdsWhitelist, setStoreIdsWhitelist }
}
