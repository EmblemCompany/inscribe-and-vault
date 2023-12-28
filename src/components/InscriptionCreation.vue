<template>
  <FileUpload
    @upload="(file) => (inscription.inscriptionFile = file)"
    accept=".apng,.flac,.gif,.html,.jpg,.jpeg,.mp3,.pdf,.png,.svg,.txt,.wav,.webm,.webp"
    :initialFile="inscription.inscriptionFile"
  >
    <UploadIcon class="icon" />
    <h3 class="info">(Optional) - If you do not upload a separate file, the image from step 1 will be used.</h3>
    <p>Drag and drop your inscription file here, or click to select a file</p>
    <p class="small info bold">
      .apng, .flac, .gif, .html, .jpg, .jpeg, .mp3, .pdf, .png, .svg, .txt, .wav, .webm, .webp
    </p>
  </FileUpload>

  <div class="input-container">
    <div class="name">Vault Taproot BTC address</div>
    <input type="text" class="input-field" :value="inscription.vaultTaprootAddress" disabled />
  </div>

  <div class="selectFee">
    <div :class="`economy ${activeFee === 'lowFee' && 'active'}`" @click="activeFee = 'lowFee'">
      <span class="name">Economy</span>
      <span class="rate">{{ recommendedFees.lowFee }} sats/vB</span>
      <span class="time">Multiple Days</span>
    </div>
    <div :class="`normal ${activeFee === 'normalFee' && 'active'}`" @click="activeFee = 'normalFee'">
      <span class="name">Normal</span>
      <span class="rate">{{ recommendedFees.normalFee }} sats/vB</span>
      <span class="time">1 hour</span>
    </div>
    <div :class="`fast ${activeFee === 'highFee' && 'active'}`" @click="activeFee = 'highFee'">
      <span class="name">Fast</span>
      <span class="rate">{{ customFee }} sats/vB</span>
      <input
        class="custom-fee-range"
        type="range"
        :min="recommendedFees.highFee"
        :max="maxHighFee"
        v-model="customFee"
      />
    </div>
  </div>

  <button :disabled="requestingPrice" @click="onSubmit" class="btn btn-primary">Create Inscription</button>

  <Teleport to="body">
    <div v-if="requestingPrice" class="modal">
      <div class="spinner active" />
      <p>The inscription is being created</p>
      <p>Please do not close this window!</p>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CreateInscriptionOrderCommand from '../commands/CreateInscriptionOrderCommand'
import useInscriptions from '../composables/useInscriptions'
import MempoolSpaceApi from '../apis/MempoolSpaceApi'

import FileUpload from './FileUpload.vue'
import UploadIcon from './icons/UploadIcon.vue'

const emit = defineEmits(['success'])

const { getInscription } = useInscriptions()
const route = useRoute()

const inscription = getInscription(route)

const requestingPrice = ref(false)
const priceRequestError = ref(null)
const recommendedFees = ref({
  lowFee: 4,
  normalFee: 7,
  highFee: 17,
})

const maxHighFee = 40
const customFee = ref(recommendedFees.value.highFee)

/** @type {import('vue').Ref<FeeSpeed>} */
const activeFee = ref('highFee')

/** @returns {number} */
const getActualFee = () => {
  if (activeFee.value === 'highFee') return customFee.value
  return recommendedFees.value[activeFee.value]
}

const onSubmit = async () => {
  try {
    requestingPrice.value = true
    priceRequestError.value = null

    const createInscriptionOrderCommand = CreateInscriptionOrderCommand.create(inscription.value)
    const fee = getActualFee()
    await createInscriptionOrderCommand.execute({ fee })
    requestingPrice.value = false
    emit('success')
  } catch (error) {
    console.error(error)
    priceRequestError.value = error
    requestingPrice.value = false
  }
}

onMounted(async () => {
  try {
    const mempoolSpaceApi = MempoolSpaceApi.create()
    recommendedFees.value = await mempoolSpaceApi.getRecommendedFees()
    customFee.value = recommendedFees.value.highFee
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
.selectFee {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.selectFee .economy,
.selectFee .normal,
.selectFee .fast {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
}

.selectFee .economy {
  margin-right: 0.5rem;
}
.selectFee .normal {
  margin: 0rem 0.5rem;
}
.selectFee .fast {
  margin-left: 0.5rem;
}
.selectFee .name {
  font-size: 1.2rem;
  font-weight: 600;
}
.selectFee .rate {
  font-size: 1rem;
}
.selectFee .time {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
.selectFee .active {
  border: 1px solid #f1c40f;
  background-color: rgb(23, 25, 35);
}

.custom-fee-range {
  margin-top: 0.3rem;
}

@media screen and (max-width: 768px) {
  .selectFee {
    flex-direction: column;
  }
  .selectFee .economy,
  .selectFee .normal,
  .selectFee .fast {
    margin: 0.5rem 0rem;
  }
}
</style>
