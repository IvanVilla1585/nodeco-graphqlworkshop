
// const mongo = require('./db')
const pubsub = require('../pubsub')

const resolver = {
  Query: {
    async students(root, args, { dataSources: { mongoDB }}) {
      let results = []
      try {
        results = await mongoDB.get('students', {})
      } catch (err) {
        throw err
      }
      return results
    }
  },
  Mutation: {
    async studentCreate(root, args, { dataSources: { mongoDB }}) {
      let result = {}
      try {
        result = await mongoDB.create('students', args.input)
        pubsub.asyncIterator('studentCreate', result)
      } catch (err) {
        throw err
      }
      return result
    }
  },
  Subscription: {
    studentCreate: {
      subscribe: () => {
        return pubsub.asyncIterator('studentCreate')
      }
    }
  }
}

 module.exports = resolver