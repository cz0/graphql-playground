const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;
const resolvers = {
  Query: {
    greeting: () => "Hello Techathoners!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({ app });

app.listen(3000, () =>
  console.info("Apollo GraphQL server is running on port 3000")
);
