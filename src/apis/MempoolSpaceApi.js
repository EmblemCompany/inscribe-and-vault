import Axios from 'axios'

class MempoolSpaceApi {
  static create() {
    return new MempoolSpaceApi()
  }

  /**
   * @returns {Promise<RecommendedFees>}
   */
  async getRecommendedFees() {
    const response = await Axios.get('https://mempool.space/api/v1/fees/recommended')
    const data = response.data

    return {
      lowFee: Math.ceil(data.economyFee),
      normalFee: Math.ceil(data.halfHourFee),
      highFee: Math.ceil(data.fastestFee),
    }
  }
}

export default MempoolSpaceApi
