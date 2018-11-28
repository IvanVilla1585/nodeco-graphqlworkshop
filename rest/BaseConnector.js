
const axios = require('axios')

class BaseConnector {
  constructor(apiUrl) {
    this.axios = this.configAxios(apiUrl)
  }

  configAxios(baseURL) {
    return axios.create({
      baseURL,
    })
  }

  async find() {
    return await this.axios.get('/')
  }

  async findById(id) {
    return await this.axios.get(`/${id}`)
  }

  async create(data) {
    return await this.axios.post('/', JSON.stringify(data))
  }

  async update(id, data) {
    return await this.axios.patch(`/${id}`, JSON.stringify(data))
  }

  async remove(id){
    return await this.axios.delete(`/${id}`)
  }

}

module.exports = BaseConnector