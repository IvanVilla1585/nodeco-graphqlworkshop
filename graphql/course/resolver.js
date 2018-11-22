
 const resolver = {
  Query: {
    async courses(root, args, { dataSources: { mongoDB }}) {
      let results = []
      try {
        results = await mongoDB.get('courses', {})
      } catch (err) {
        throw err
      }
      return results
    }
  },
  Mutation: {
    async courseCreate(root, args, { dataSources: { mongoDB }}) {
      let result = {}
      try {
        result =  await mongoDB.create('courses', args.input)
      } catch (err) {
        console.error(err)
        throw err
      }
      return result
    }
  }
 }

 module.exports = resolver