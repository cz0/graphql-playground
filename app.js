const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const models = require("./models");



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
});
server.applyMiddleware({ app });

app.listen(3000, () =>
  console.info("Apollo GraphQL server is running on port 3000")
);
