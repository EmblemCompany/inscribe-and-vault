import OrdinalsBotApi from '../apis/OrdinalsBotApi'
const ordinalsBotApi = OrdinalsBotApi.create()

class CreateInscriptionOrderCommand {
  /**
   * @param {Inscription} inscription
   * @returns {CreateInscriptionOrderCommand}
   */
  static create(inscription) {
    return new CreateInscriptionOrderCommand(inscription)
  }

  /**
   * @private
   * @param {Inscription} inscription
   */
  constructor(inscription) {
    this.inscription = inscription
  }

  /**
   * @param {object} options
   * @param {number} options.fee
   * @returns {Promise<void>}
   */
  async execute({ fee }) {
    const file = this.inscription.inscriptionFile || this.inscription.vaultImage
    const receiveAddress = this.inscription.vaultTaprootAddress

    const {
      data: {
        charge: { id, hosted_checkout_url, status },
      },
    } = await ordinalsBotApi.createOrder({ file, receiveAddress, fee })

    this.inscription.inscriptionOrderId = id
    this.inscription.inscriptionOrderCheckoutUrl = hosted_checkout_url
    this.inscription.inscriptionOrderStatus = status
  }
}

export default CreateInscriptionOrderCommand
