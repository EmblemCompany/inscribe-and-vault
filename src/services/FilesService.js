import { Buffer } from 'buffer'

/**
 * @param {string} fileAsBase64
 * @returns {number}
 */
export const getFileSize = (fileAsBase64) => {
  const base64WithoutMimeType = fileAsBase64.split(',')[1]
  return Buffer.from(base64WithoutMimeType).length
}
