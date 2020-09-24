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
    date: String!
    name: String!
    phone: String!
    email: String
    city: String!
    street: String!
    house: String!
    deliveryMethod: String!
    deliveryCost: Int!
    currency: String!
    rate: Float!
    totalPrice: Float!
    items: [OrderItem!]!
  }

  input OrderInput {
    name: String!
    phone: String!
    date: String!
    email: String
    city: String!
    street: String!
    house: String!
    deliveryMethod: String!
    deliveryCost: Int!
    currency: String!
    rate: Float!
    totalPrice: Float!
    items: [OrderItemInput!]!
  }

  type OrderItem {
    pizza: Pizza!
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
    deliveryCost: Float!
    me: User
    orders: [Order]!
  }

  type Mutation {
    addOrder(order: OrderInput): Order
    signIn(name: String!, phone: String!): User!
    signOut: String!
  }
`;

module.exports = typeDefs;
