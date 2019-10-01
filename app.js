const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");
const { users, cars } = require("./data");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    cars: [Car]
    car(id: ID!): Car
    greeting: String
  }

  type User {
    id: ID!
    name: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String
    owner: User!
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
    cars: () => cars,
    car: (_, { id }) => {
      const filteredCars = cars.filter(car => car.id === id);
      if (filteredCars.length === 0) {
        return null;
      }

      return filteredCars[0];
    },
    greeting: () => "Hello Techathoners!"
  },
  Car: {
    owner: parent => {
      const filteredUsers = users.filter(user => user.id === parent.ownedBy);
      if (!filteredUsers) {
        return null;
      }
      return filteredUsers[0];
    }
  },
  User: {
    cars: ({ id }) => {
      return cars.filter(car => car.ownedBy === id);
    }
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
