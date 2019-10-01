const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");
const { users } = require("./data");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    greeting: String
  }

  type User {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      const filteredUsers = users.filter(u => u.id === id);
      if (filteredUsers.length === 0) {
        return null;
      }

      return filteredUsers[0];
    },
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
