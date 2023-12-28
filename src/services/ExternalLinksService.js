export const getEmblemVaultUrl = (tokenId) => {
  return `https://emblem.finance/nft?id=${tokenId}`
}

export const getLooksRareUrl = (tokenId) => {
  return `https://looksrare.org/collections/0x82C7a8f707110f5FBb16184A5933E9F78a34c6ab/${tokenId}`
}

export const getOpenSeaUrl = (tokenId) => {
  return `https://opensea.io/assets/ethereum/0x82C7a8f707110f5FBb16184A5933E9F78a34c6ab/${tokenId}`
}

export const getOrdinalsBotUrl = (inscriptionId) => {
  return `https://ordinalsbot.com/inscription/${inscriptionId}`
}
