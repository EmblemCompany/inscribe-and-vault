import EmblemVaultApi from '../apis/EmblemVaultApi'

class CreateVaultCommand {
  /**
   * @param {Inscription} inscription
   * @returns {CreateVaultCommand}
   */
  static create(inscription) {
    return new CreateVaultCommand(inscription)
  }

  /**
   * @private
   * @param {Inscription} inscription
   */
  constructor(inscription) {
    this.inscription = inscription
    this.emblemVaultApi = EmblemVaultApi.create()
  }

  /**
   * Creates a vault and enriches the inscription with the vault-related data
   *
   * @returns {Promise<void>}
   */
  async execute() {
    /** @type {VaultCreationResponse} */
    const response = await this.emblemVaultApi.createVault({
      fromAddress: this.inscription.toAddress,
      toAddress: this.inscription.toAddress,
      name: this.inscription.name,
      description: this.inscription.description,
      image: this.inscription.vaultImage.dataURL,
      private: false,
      password: '',
      values: [],
      experimental: true,
    })

    this.#enrichInscriptionWithVaultData(response)
  }

  /**
   * @param {VaultCreationResponse} response
   */
  #enrichInscriptionWithVaultData(response) {
    const taprootAddress = response.data.data.addresses.find(({ coin }) => coin === 'TAP')
    if (!taprootAddress) throw new Error('No taproot address found in vault creation response')

    this.inscription.vaultTaprootAddress = taprootAddress.address
    this.inscription.vaultTokenId = response.data.data.tokenId
    this.inscription.vaultNetwork = response.data.data.network
  }
}

export default CreateVaultCommand
