const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    cars: [Car]
    car(id: ID!): Car
  }

  extend type Mutation {
    makeCar(id: ID!, make: String!, model: String!, color: String!): Car!
    removeCar(id: ID!): Boolean!
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    owner: User!
  }
`;
