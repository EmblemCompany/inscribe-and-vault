import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import { getRandomString } from '../services/StringHelpers'

/** @type {StoreInscriptions} */
const store = useLocalStorage('inscriptions', {})

/**
 * @returns {Inscription}
 */
const getBlankInscription = () => ({
  storeId: getRandomString(),
  storeVersion: 0,
})

export default function useInscriptions() {
  /**
   * @param {Inscription} inscription
   */
  const save = (inscription) => {
    store.value[inscription.storeId] = inscription
  }

  /**
   * @returns {string} storeId
   */
  const create = () => {
    const inscription = getBlankInscription()
    save(inscription)
    return inscription.storeId
  }

  /**
   * @param {Inscription} inscription
   */
  const trash = ({ storeId }) => {
    delete store.value[storeId]
  }

  /**
   * @param {import('vue-router').RouteLocationNormalizedLoaded} route
   * @return {import('vue').Ref<Inscription> | null}
   */
  const getInscription = (route) => {
    return computed(() => {
      const storeId = route.query?.id
      if (!storeId) return null
      return store.value[String(storeId)]
    })
  }

  return {
    create,
    getInscription,
    inscriptions: store,
    save,
    trash,
  }
}
