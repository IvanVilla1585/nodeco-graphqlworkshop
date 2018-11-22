
const express = require('express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { ApolloServer } = require('apollo-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const mongo = require('./db')
const schema = require('./graphql')

const app = express()

const server = createServer(app)

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      mongoDB: mongo
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
      path: '/subscriptions',
    });
});