<template>
  <h1>Create inscription</h1>

  <div v-if="inscription" class="create-container">
    <div class="steps">
      <div :class="{ step: true, active: form.activeTab === 1 }">
        <div class="bubble">1</div>
        <p>Vault setup</p>
      </div>

      <div :class="{ step: true, active: form.activeTab === 2 }">
        <div class="bubble">2</div>
        <p>Inscription creation</p>
      </div>

      <div :class="{ step: true, active: form.activeTab === 3 }">
        <div class="bubble">3</div>
        <p>Payment</p>
      </div>
    </div>

    <div class="step-content">
      <div v-if="form.activeTab === 1">
        <InscriptionVaultCreation @success="form.activeTab = 2" />
      </div>

      <div v-else-if="form.activeTab === 2">
        <InscriptionCreation @success="form.activeTab = 3" />
      </div>

      <div v-else-if="form.activeTab === 3">
        <InscriptionPayment @success="router.push('/')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getStatus } from '../services/InscriptionService'
import useInscriptions from '../composables/useInscriptions'
import useInscriptionsStatusesUpdater from '../composables/useInscriptionsStatusesUpdater'

import InscriptionVaultCreation from './InscriptionVaultCreation.vue'
import InscriptionCreation from './InscriptionCreation.vue'
import InscriptionPayment from './InscriptionPayment.vue'

const { create: createInscription, getInscription, inscriptions } = useInscriptions()
const route = useRoute()
const router = useRouter()

const inscription = getInscription(route)

const getInitialActiveTab = () => {
  const inscriptionStatus = getStatus(inscription.value)
  if (inscriptionStatus === 'inscriptionOrderCreated') return 3
  if (inscriptionStatus === 'vaultCreated') return 2
  return 1
}

const form = reactive({
  activeTab: getInitialActiveTab(),
})

onMounted(async () => {
  let currentStoreId = route.query.id

  if (!currentStoreId) {
    currentStoreId = createInscription()
    router.replace({ query: { id: currentStoreId } })
  }

  await nextTick()

  const { setStoreIdsWhitelist } = useInscriptionsStatusesUpdater(inscriptions)
  setStoreIdsWhitelist([String(currentStoreId)])
})
</script>

<style>
.create-container {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.steps {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.step {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
  text-align: center;
  padding: 1rem;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
}

.step:nth-child(1) {
  border-top-left-radius: 0.5rem;
}

.step:nth-child(3) {
  border-top-right-radius: 0.5rem;
}

.step.active {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
}

.step .bubble {
  font-weight: 300;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  background-color: rgb(49, 130, 206);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step p {
  padding: 0.5rem;
}

.step-content {
  padding: 2rem;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.dropzone {
  border: 2px dashed #aaa;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.dropzone:hover,
.dropzone-hovered,
.input-field:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropzone img {
  width: 100%;
  max-width: 300px !important;
  border: 2px dashed #f1c40f;
  border-radius: 0.5rem;
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 0.2rem solid rgba(255, 255, 255, 0.1);
  border-top: 0.2rem solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading.active {
  display: flex;
}

.dropzone p {
  font-size: 1rem;
  font-weight: 300;
}

.dropzone p.small {
  font-size: 0.8rem;
  font-weight: 300;
  opacity: 0.5;
}

.name {
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.input-container {
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  font-size: 1rem;
  outline: none;
  border-radius: 0.5rem;
  color: #fff;
}

/* @n3t */
.form-error {
  color: red;
}

textarea {
  resize: none;
  overflow: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn {
  cursor: pointer;
  background-color: rgb(49, 130, 206);
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  border-radius: 0.5rem;
  color: #fff;
}

.btn:disabled {
  opacity: 0.2;
}

.btn:hover {
  background-color: rgb(41, 106, 167);
}

.info {
  color: #f1c40f;
  opacity: 1 !important;
}

.bold {
  font-weight: 700 !important;
}

.qr {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto 2rem auto;
}

.qr img {
  border-radius: 0.5rem;
}

.payment {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.payment div {
  flex-grow: 1;
}

.form-error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.fileInfo {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  position: relative;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

@media screen and (max-width: 768px) {
  .step p {
    display: none;
  }

  .payment {
    flex-direction: column;
  }
}
</style>
