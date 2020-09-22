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
    name: String!
    phone: String!
    email: String!
    city: String!
    street: String!
    house: String!
    deliveryMethod: String!
    currency: String!
    rate: Float!
    totalPrice: Float!
    items: [OrderItem!]!
  }

  input OrderInput {
    name: String!
    phone: String!
    email: String!
    city: String!
    street: String!
    house: String!
    deliveryMethod: String!
    currency: String!
    rate: Float!
    totalPrice: Float!
    items: [OrderItemInput!]!
  }

  type OrderItem {
    pizzaId: ID!
    price: Float!
    count: Int!
  }

  input OrderItemInput {
    pizzaId: ID!
    price: Float!
    count: Int!
  }

  type Query {
    pizzas: [Pizza]!
    pizza(pizzaId: ID!): Pizza!
    EURRate: Float!
    me: User
    orders(user: ID!): [Order]!
  }

  type Mutation {
    addOrder(order: OrderInput): Order
    signIn(name: String, phone: String): User!
  }
`;

module.exports = typeDefs;
