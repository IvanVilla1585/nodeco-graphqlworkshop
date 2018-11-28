'use strict'

const BaseConnector = require('../../rest/BaseConnector')

class CourseConnector extends BaseConnector {
  constructor(apiUrl) {
    super(apiUrl)
  }

  async findCoursesByStudent(data) {
    const results = await this.axios.get(`/student?ids=${data.join(',')}`)
    return results
  }
}

module.exports = CourseConnector