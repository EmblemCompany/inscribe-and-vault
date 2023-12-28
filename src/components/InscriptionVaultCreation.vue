<template>
  <FileUpload
    @upload="(file) => (inscription.vaultImage = file)"
    accept=".jpg,.webp,.png,.gif"
    :initialFile="inscription.vaultImage"
  >
    <UploadIcon class="icon" />
    <p>Drag and drop your vault image here, or click to select a file</p>
    <p class="small info bold">.jpg, .webp, .png, .gif</p>
    <div class="form-error" v-if="!isFormPristine && errorFields?.vaultImage?.length" text-red>
      {{ errorFields.vaultImage[0].message }}
    </div>
  </FileUpload>

  <div class="input-container">
    <div class="name">Name</div>
    <input type="text" class="input-field" v-model="inscription.name" />
    <div class="form-error" v-if="!isFormPristine && errorFields?.name?.length" text-red>
      {{ errorFields.name[0].message }}
    </div>
  </div>

  <div class="input-container">
    <div id="description" class="name">Description</div>
    <textarea type="text" rows="6" class="input-field" v-model="inscription.description"></textarea>
    <div class="form-error" v-if="!isFormPristine && errorFields?.description?.length" text-red>
      {{ errorFields.description[0].message }}
    </div>
  </div>

  <div class="input-container">
    <div id="toAddress" class="name">Receiver Ethereum address</div>
    <input type="text" class="input-field" v-model="inscription.toAddress" />
    <div class="form-error" v-if="!isFormPristine && errorFields?.toAddress?.length" text-red>
      {{ errorFields.toAddress[0].message }}
    </div>
  </div>

  <div v-if="vaultCreationError" class="error-container">
    <p>{{ vaultCreationError }}</p>
  </div>

  <button :disabled="!isFormPristine && !pass && creatingVault" @click="onSubmit" class="btn btn-primary">
    Create Emblem Vault
  </button>

  <Teleport to="body">
    <div v-if="creatingVault" class="modal">
      <div class="spinner active" />
      <p>The vault is being created</p>
      <p>Please do not close this window!</p>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useRoute } from 'vue-router'

import { ethereumAddressRegex } from '../services/ValidationService'
import CreateVaultCommand from '../commands/CreateVaultCommand'
import useInscriptions from '../composables/useInscriptions'

import FileUpload from './FileUpload.vue'
import UploadIcon from './icons/UploadIcon.vue'

const emit = defineEmits(['success'])

const { getInscription } = useInscriptions()
const route = useRoute()

const inscription = getInscription(route)

// @n3t: modal styling is in modal.css
const creatingVault = ref(false)
const isFormPristine = ref(true)
const vaultCreationError = ref(null)

/** @type {import('async-validator').Rules} */
const rules = {
  vaultImage: {
    type: 'object',
    required: true,
    fields: {
      name: { type: 'string', required: true },
      size: { type: 'number', required: true },
      dataURL: { type: 'string', required: true },
    },
    message: 'Please upload an image',
  },
  name: {
    type: 'string',
    min: 1,
    max: 150,
    required: true,
    message: 'Name is required',
  },
  description: {
    type: 'string',
    min: 1,
    required: true,
    message: 'Description is required',
  },
  toAddress: {
    type: 'string',
    required: true,
    pattern: ethereumAddressRegex,
    message: 'Invalid Ethereum address',
  },
}

const { errorFields, pass } = useAsyncValidator(inscription, rules)

const onSubmit = async () => {
  try {
    isFormPristine.value = false
    vaultCreationError.value = null
    if (!pass.value) return

    creatingVault.value = true
    const createVaultCommand = CreateVaultCommand.create(inscription.value)
    await createVaultCommand.execute()
    creatingVault.value = false

    emit('success')
  } catch (error) {
    console.error(error)
    vaultCreationError.value = error
    creatingVault.value = false
  }
}
</script>
