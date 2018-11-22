
const schema = `

  type Course {
    id: ID,
    name: String,
    price: Float
    students: [Student]
  }

  input CourseCreateInput {
    name: String!,
    price: Float
  }

  input CourseUpdateInput {
    name: String,
    price: Float,
    students: [ID]
  }

  extend type Query {
    courses: [Course]
    courseById(id: ID!): Course
  }

  extend type Mutation {
    courseCreate(input: CourseCreateInput): Course
    courseUpdate(id: ID!, input: CourseUpdateInput): Course
    courseDelete(id: ID!): Course
  }
`

module.exports = schema