
const pubsub = require('../pubsub')

const resolver = {
  Query: {
    async students(root, args, { dataSources: { studentConnector }}) {
      let results = []
      try {
        results = await studentConnector.find()
      } catch (err) {
        console.error(err)
        throw err
      }
      return results.data
    },
    async studentById(root, args, { dataSources: { studentConnector }}) {
      let results = []
      try {
        results = await studentConnector.findById(args.id)
      } catch (err) {
        console.error(err)
        throw err
      }
      return results.data
    }
  },
  Mutation: {
    async studentCreate(root, args, { dataSources: { studentConnector }}) {
      let result = {}
      try {
        result = await studentConnector.create({ ...args.input })
        pubsub.publish('STUDENT_CREATED', { studentCreate: result })
      } catch (err) {
        console.error(err)
        throw err
      }
      return result.data
    },
    async studentUpdate(root, args, { dataSources: { studentConnector }}) {
      let result = {}
      try {
        result = await studentConnector.update(args.id, { ...args.input })
      } catch (err) {
        console.error(err)
        throw err
      }
      return result.data
    },
    async studentDelete(root, args, { dataSources: { studentConnector }}) {
      let result = {}
      try {
        result = await studentConnector.remove(args.id)
      } catch (err) {
        console.error(err)
        throw err
      }
      return result.data
    }
  },
  Subscription: {
    studentCreate: {
      subscribe: () => {
        return pubsub.asyncIterator('STUDENT_CREATED')
      }
    }
  },
  Student: {
    async courses({ courses }, args, { dataSources: { cache } }) {
      let results = []
      if (!courses) {
        return results
      }
      try {
        const coursesCache = cache.get('courses')
        results =  coursesCache.filter(d => courses.includes(d.id))
      } catch (e) {
        throw e
      }
      return results
    }
  }
}

 module.exports = resolver