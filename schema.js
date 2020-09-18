const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Pizza {
    _id: ID!
    name: String!
    description: String!
    img: String!
    price: Float!
  }

  type User {
    _id: ID!
    name: String!
    phone: String!
  }

  type Order {
    _id: ID!
    user: User!
    address: String!
    orderContent: [OrderContent]!
    totalPrice: Float!
  }

  input OrderInput {
    user: ID!
    address: String
    orderContent: [OrderContentInput]!
    totalPrice: Float!
  }

  type OrderContent {
    pizza: Pizza!
    count: Int!
  }

  input OrderContentInput {
    pizza: ID!
    count: Int!
  }

  type Query {
    pizzas: [Pizza]!
    EURRate: Float!
    me: User
    orders(user: ID!): [Order]!
  }

  type Mutation {
    addOrder(order: OrderInput): Order
    signIn(name: String, phone: String!): User!
  }
`;

module.exports = typeDefs;
