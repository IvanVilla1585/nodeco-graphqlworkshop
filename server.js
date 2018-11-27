'use strict'

const express = require('express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { ApolloServer } = require('apollo-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const schema = require('./graphql')
const config = require('./utils/config')
const CourseConnector = require('./graphql/course/connector')
const StudentConnector = require('./graphql/student/connector')

const courseConnector = new CourseConnector(config.courseAPIUrl)
const studentConnector = new StudentConnector(config.studentAPIUrl)

const app = express()

const server = createServer(app)

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      courseConnector,
      studentConnector
    }
  }
})

apolloServer.applyMiddleware({ app })

// apolloServer.installSubscriptionHandlers(server)

server.listen(4000, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: server,
      path: '/graphql',
    });
});