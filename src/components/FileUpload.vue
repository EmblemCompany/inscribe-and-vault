<template>
  <div ref="dropZoneRef" class="dropzone" @click="open()">
    <slot v-if="!uploadedFile && !inscriptionFile" />

    <div v-if="uploading" class="loading active">
      <div class="spinner"></div>
      <p>Uploading and processing file</p>
    </div>

    <div v-if="errorMessage" class="error-container">
      <p>{{ errorMessage }}</p>
    </div>

    <img v-if="inscriptionFile && isImage" :src="inscriptionFile.dataURL" style="max-width: 100%" />
    <p class="fileInfo" v-if="inscriptionFile && !isImage">You uploaded an {{ fileType }} file</p>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { useDropZone, useFileDialog, useBase64 } from '@vueuse/core'

import { getFileSize } from '../services/FilesService'

/** @type {Readonly<{ accept?: string, initialFile?: InscriptionFile }>} */
const props = defineProps(['accept', 'initialFile'])
const emit = defineEmits(['upload'])

const dropZoneRef = ref()
const errorMessage = ref('')
/** @type {import('vue').Ref<InscriptionFile | null>} */
const inscriptionFile = ref(props.initialFile || null)
const uploadedFile = ref(null)
const uploading = ref(false)

const { base64: fileBase64 } = useBase64(uploadedFile)

const fileType = computed(() => {
  if (!inscriptionFile.value.dataURL) return null
  return inscriptionFile.value.dataURL.split(':')[1].split(';').shift()
})

const isImage = computed(() => {
  if (!inscriptionFile.value.dataURL) return false
  return inscriptionFile.value.dataURL.startsWith('data:image')
})

/** @param {Blob[]} files */
const onDrop = (files) => {
  try {
    uploading.value = true
    uploadedFile.value = files[0]
  } catch (error) {
    console.error(error)
  }
}

const { open, files } = useFileDialog({ multiple: false, accept: props.accept })

watch(files, async (files) => {
  try {
    uploading.value = true
    uploadedFile.value = files[0]
  } catch (error) {
    console.error(error)
  }
})

const validateFileExtension = () => {
  const validExtensions = props.accept.split(',')
  const fileExtension = uploadedFile.value.name.split('.').pop()
  if (validExtensions.includes(`.${fileExtension}`)) return
  throw new Error(`Invalid file extension: ${fileExtension}`)
}

watch(fileBase64, () => {
  try {
    errorMessage.value = ''

    validateFileExtension()

    /** @type {InscriptionFile} */
    inscriptionFile.value = {
      name: uploadedFile.value.name,
      size: getFileSize(fileBase64.value),
      dataURL: fileBase64.value,
    }

    emit('upload', inscriptionFile)
  } catch (error) {
    // @ts-ignore
    errorMessage.value = error
    console.error(error)
  } finally {
    uploading.value = false
  }
})

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

watch(isOverDropZone, (isOverDropZone) => {
  if (isOverDropZone) {
    dropZoneRef.value.classList.add('dropzone-hovered')
  } else {
    dropZoneRef.value.classList.remove('dropzone-hovered')
  }
})
</script>
