
const BaseConnector = require('../../rest/BaseConnector')

class StudentConnector extends BaseConnector {
  constructor(apiUrl) {
    super(apiUrl)
  }
}

module.exports = StudentConnector