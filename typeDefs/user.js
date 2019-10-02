const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    makeUser(id: ID!, name: String!): User!
    removeUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    name: String!
    cars: [Car]
  }
`;
