<template>
  <div class="payment">
    <iframe
      :src="inscription.inscriptionOrderCheckoutUrl"
      style="width: 100%; height: 810px; border-radius: 0.5rem"
      frameborder="0"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import useInscriptions from '../composables/useInscriptions'

const { getInscription } = useInscriptions()
const route = useRoute()

const inscription = getInscription(route)
</script>
