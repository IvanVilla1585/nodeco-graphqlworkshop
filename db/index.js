'use strict'

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const courseSchema = require('./models/course')
const studentSchema = require('./models/student')

class Mongo {
  constructor() {
    this.models = {}
    this.url = 'mongodb://localhost:27017/nodeco'
    this.setupDB()
  }

  async setupDB() {
    mongoose.connect(this.url)
    this.models.courses = mongoose.model('course', courseSchema)
    this.models.students = mongoose.model('student', studentSchema)
  }

  async get(model, filter) {
    const db = this.models[model]
    const results = await db.find(filter)
    return results
  }

  async create(model, data) {
    const Model = this.models[model]
    const result = await new Model(data).save()
    return result
  }
}

module.exports = new Mongo()