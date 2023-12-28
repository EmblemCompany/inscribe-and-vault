<template>
  <div class="inscription">
    <TrashIcon @click="onDelete" class="icon delete" :fill="'#e74c3c'" />

    <div class="vault-name">
      <span>{{ props.inscription.name }}</span>
    </div>

    <div class="image-container">
      <div class="image"><img :src="image" /></div>
    </div>

    <div v-if="props.inscription.id" class="input-container">
      <div class="name">
        <span>Inscription ID</span>
        <div class="icons">
          <CopyIcon class="icon" :fill="'#ffffff'" @click="copy(props.inscription.id)" />
          <a :href="getInscriptionExplorerUrl(props.inscription.id)" target="_blank" rel="noopener noreferrer">
            <LinkIcon class="icon" :fill="'#ffffff'" />
          </a>
        </div>
      </div>
      <input type="text" class="input-field" :value="props.inscription.id" disabled />
    </div>

    <div v-if="props.inscription.inscriptionTxHash" class="input-container">
      <div class="name">
        <span>Inscription transaction</span>
        <div class="icons">
          <CopyIcon class="icon" :fill="'#ffffff'" @click="copy(props.inscription.inscriptionTxHash)" />
          <a
            :href="getBitcoinTxExplorerUrl(props.inscription.inscriptionTxHash)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon class="icon" :fill="'#ffffff'" />
          </a>
        </div>
      </div>
      <input type="text" class="input-field" :value="props.inscription.inscriptionTxHash" disabled />
    </div>

    <div v-if="props.inscription.toAddress" class="input-container">
      <div class="name">
        <span>Vault ETH address</span>
        <div class="icons">
          <CopyIcon class="icon" :fill="'#ffffff'" @click="copy(props.inscription.toAddress)" />
          <a
            :href="getEthereumAddressExplorerUrl(props.inscription.toAddress)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon class="icon" :fill="'#ffffff'" />
          </a>
        </div>
      </div>
      <input type="text" class="input-field" :value="props.inscription.toAddress" disabled />
    </div>

    <div v-if="props.inscription.vaultTaprootAddress" class="input-container">
      <div class="name">
        <span>Vault BTC Taproot address</span>
        <div class="icons">
          <CopyIcon class="icon" :fill="'#ffffff'" @click="copy(props.inscription.vaultTaprootAddress)" />
          <a
            :href="getBitcoinAddressExplorerUrl(props.inscription.vaultTaprootAddress)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon class="icon" :fill="'#ffffff'" />
          </a>
        </div>
      </div>
      <input type="text" class="input-field" :value="props.inscription.vaultTaprootAddress" disabled />
    </div>

    <div v-if="ordinalsBotOrder" class="input-container">
      <div class="name">
        <span>OrdinalsBot order</span>
        <div class="icons">
          <CopyIcon class="icon" :fill="'#ffffff'" @click="copy(ordinalsBotOrder)" />
          <a href="https://ordinalsbot.com/orders" target="_blank" rel="noopener noreferrer">
            <LinkIcon class="icon" :fill="'#ffffff'" />
          </a>
        </div>
      </div>
      <input type="text" class="input-field" :value="ordinalsBotOrder" disabled />
    </div>

    <div class="input-container">
      <div class="action-button">
        <router-link
          :to="isButtonEnabled ? `/inscriptions/update?id=${props.inscription.storeId}` : '#'"
          class="btn btn-primary link-btn"
          :style="{ width: '100%', cursor: isButtonEnabled ? 'pointer' : 'not-allowed' }"
        >
          <span>{{ buttonText }}</span>

          <div v-if="showSpinnerInButton" class="spinner active"></div>
        </router-link>
      </div>
    </div>

    <div class="input-container">
      <div class="icons">
        <a
          v-if="props.inscription.vaultTokenId"
          :href="getEmblemVaultUrl(props.inscription.vaultTokenId)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmblemVaultIcon class="icon" />
        </a>

        <a
          v-if="props.inscription.vaultTokenId"
          :href="getLooksRareUrl(props.inscription.vaultTokenId)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LooksRareIcon class="icon looks-rare" />
        </a>

        <a
          v-if="props.inscription.vaultTokenId"
          :href="getOpenSeaUrl(props.inscription.vaultTokenId)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OpenSeaIcon class="icon" />
        </a>

        <a
          v-if="props.inscription.id"
          :href="getOrdinalsBotUrl(props.inscription.id)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OrdinalsBotIcon class="icon" :fill="'#ffffff'" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useClipboard } from '@vueuse/core'

import {
  getEthereumAddressExplorerUrl,
  getInscriptionExplorerUrl,
  getBitcoinAddressExplorerUrl,
  getBitcoinTxExplorerUrl,
} from '../services/ExplorersService'

import {
  getEmblemVaultUrl, //
  getLooksRareUrl,
  getOpenSeaUrl,
  getOrdinalsBotUrl,
} from '../services/ExternalLinksService'

import { getOrdinalsBotOrder } from '../services/InscriptionService'

import { getStatus } from '../services/InscriptionService'
import useInscriptions from '../composables/useInscriptions'

import CopyIcon from './icons/CopyIcon.vue'
import EmblemVaultIcon from './icons/EmblemVaultIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import LooksRareIcon from './icons/LooksRareIcon.vue'
import OpenSeaIcon from './icons/OpenSeaIcon.vue'
import OrdinalsBotIcon from './icons/OrdinalsBotIcon.vue'
import TrashIcon from './icons/TrashIcon.vue'

/** @type {Readonly<{ inscription?: Inscription }>} */
const props = defineProps(['inscription'])

const { copy } = useClipboard()
const { trash } = useInscriptions()

const onDelete = () => trash(props.inscription)

const inscriptionStatus = computed(() => getStatus(props.inscription))

const image = computed(() => {
  return props.inscription?.vaultImage?.dataURL || 'images/placeholder.jpg'
})

const buttonText = computed(() => {
  if (inscriptionStatus.value === 'readyToClaim') return 'Vault ready to claim'
  if (inscriptionStatus.value === 'processingInscription') return 'Processing inscription...'
  // @n3t: I think for now we can just change the button color and disable it if expired?
  if (inscriptionStatus.value === 'inscriptionOrderExpired') return 'Inscription order expired'
  if (inscriptionStatus.value === 'inscriptionOrderCreated') return 'Proceed to payment'
  if (inscriptionStatus.value === 'vaultCreated') return 'Create inscription'
  return 'Mint on Emblem Vault'
})

const isButtonEnabled = computed(() => {
  const statusesWithButtonEnabled = ['created', 'vaultCreated', 'inscriptionOrderCreated']
  return statusesWithButtonEnabled.includes(inscriptionStatus.value)
})

const ordinalsBotOrder = computed(() => {
  return getOrdinalsBotOrder(props.inscription)
})

const showSpinnerInButton = computed(() => {
  const statusesWithSpinner = ['inscriptionOrderCreated', 'processingInscription']
  return statusesWithSpinner.includes(inscriptionStatus.value)
})
</script>

<style scoped>
.link-btn {
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  align-items: center;
  column-gap: 8px;
}

.link-btn .spinner {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
