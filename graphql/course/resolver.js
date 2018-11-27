
 const resolver = {
  Query: {
    async courses(root, args, { dataSources: { courseConnector }}) {
      let results = []
      try {
        results = await courseConnector.find()
      } catch (err) {
        throw err
      }
      return results
    },
    async courseById(root, { id }, { dataSources: { courseConnector }}) {
      let results = []
      try {
        results = await courseConnector.findById(id)
      } catch (err) {
        throw err
      }
      return results
    }
  },
  Mutation: {
    async courseCreate(root, { input }, { dataSources: { courseConnector }}) {
      let result = {}
      try {
        result =  await courseConnector.create({ ...input })
      } catch (err) {
        console.error(err)
        throw err
      }
      return result
    },
    async courseUpdate(root, { id, input }, { dataSources: { courseConnector }}) {
      let result = {}
      try {
        result =  await courseConnector.update(id, { input })
      } catch (err) {
        console.error(err)
        throw err
      }
      return result
    },
    async courseDelete(root, { id }, { dataSources: { courseConnector }}) {
      let result = {}
      try {
        result =  await courseConnector.remove(id)
      } catch (err) {
        console.error(err)
        throw err
      }
      return result
    }
  }
 }

 module.exports = resolver