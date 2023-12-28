/**
 *
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
export const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
