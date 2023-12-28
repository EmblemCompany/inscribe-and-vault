import Axios from 'axios'

class OrdinalsBotApi {
  static create() {
    return new OrdinalsBotApi()
  }

  /**
   * @private
   */
  constructor() {
    this.baseUrl = 'https://ordinalsbot.com/api'
    // this.baseUrl = 'https://signet.ordinalsbot.com/api'
  }

  /**
   * @param {Object} options
   * @param {InscriptionFile} options.file
   * @param {string} options.receiveAddress
   * @param {number} options.fee
   * @returns {Promise<CreateOrderResponse>}
   */
  async createOrder({ file, receiveAddress, fee }) {
    return Axios.post(`${this.baseUrl}/order`, { files: [file], receiveAddress, fee })
  }

  /**
   * @param {string} inscriptionOrderId
   * @returns {Promise<GetOrderStatusResponse>}
   */
  async getOrderStatus(inscriptionOrderId) {
    return Axios.get(`${this.baseUrl}/order?id=${inscriptionOrderId}`)
  }
}

export default OrdinalsBotApi
