
const merge = require('lodash.merge')
const { makeExecutableSchema } = require('apollo-server-express')

const schemaDirectives = require('./directives')
const studentSchema =  require('./student/schema')
const studentResolver =  require('./student/resolver')
const courseSchema =  require('./course/schema')
const courseResolver =  require('./course/resolver')

const rootSchema = [
  studentSchema,
  courseSchema
]

const resolvers = merge([
  studentResolver,
  courseResolver
])

const schema = makeExecutableSchema({
  resolvers,
  schemaDirectives,
  typeDefs: rootSchema
})

module.exports = schema

