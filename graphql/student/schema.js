
const schema = `

  directive @upper on FIELD_DEFINITION

  enum STATUS {
    ACTIVE,
    INACTIVE
  }

  type Student {
    "esto es un id"
    id: ID,
    name: String @deprecated(reason: "test"),
    lastName: String @upper,
    email: String,
    average: Float,
    status: STATUS
  }

  input StudentCreateInput {
    name: String!,
    lastName: String,
    email: String!,
    average: Float
  }

  input StudentUpdateInput {
    name: String,
    lastName: String,
    average: Float
  }

  type Query {
    students: [Student]
    studentById(id: ID!): Student
  }

  type Mutation {
    studentCreate(input: StudentCreateInput): Student
    studentUpdate(id: ID!, input: StudentUpdateInput): Student
    studentDelete(id: ID!): Student
  }

  type Subscription {
    studentCreate: Student
  }
`

module.exports = schema