
const { ApolloServer } = require('apollo-server')

const students = [
  { id: 1, name: "Ivan", lastName: "Villa", email: "trezeguet55@gmail.co" },
  { id: 2, name: "Dario", lastName: "Ramirez", email: "trezeguet55@gmail.co" },
  { id: 3, name: "Helen", lastName: "Osman", email: "trezeguet55@gmail.co" },
  { id: 5, name: "Juan", lastName: "Villa", email: "trezeguet55@gmail.co" }
]

const courses = [
  { name: "Graphql", price: 12.67, students: [1,3] },
  { name: "React", price: 15.67, students: [2,4] },
  { name: "Node", price: 13.67, students: [1,2,3] }
]
const typeDefs = `

  type Student {
    name: String,
    fullName: String,
    lastName: String,
    course: [Course],
    email: String
  }

  type Course {
    name: String,
    price: Float
  }

  type Message {
    message: String
  }

  type Query {
    courses: [Course]
    students: [Student]
    hello(name: String!): Message
  }
`

const resolvers = {
  Query: {
    courses(root, args, contexto) {
      return courses
    },
    students(root, args, contexto) {
      return students
    },
    hello(root, args, contexto) {
      console.log(args)
      return { message: `hello ${args.name}` }
    }
  },
  Student: {
    fullName(root, args, context) {
      return `${root.name} ${root.lastName}`
    },
    course(root, args, contexto) {
      const results = courses.filter(data => data.students.includes(root.id))
      console.log(results)
      return results
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`server running on the url ${url}`)) 
