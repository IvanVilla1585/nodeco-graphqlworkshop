
const { defaultFieldResolver } = require('graphql')
const { SchemaDirectiveVisitor } = require('apollo-server-express')


class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}

module.exports = UpperCaseDirective
