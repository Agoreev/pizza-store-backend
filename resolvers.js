const {
  getPizzas,
  signIn,
  me,
  addOrder,
  getOrders,
  getPizzaById,
} = require("./dataSources/mongo");
const { getEURRate } = require("./dataSources/currency");

const resolvers = {
  Query: {
    pizzas: async () => await getPizzas(),
    pizza: async (parent, args, ctx, info) => await getPizzaById(args),
    orders: async (parent, args, ctx, info) => await getOrders(args),
    EURRate: async () => await getEURRate(),
    me: async (parent, args, ctx, info) => await me(ctx),
  },
  Mutation: {
    addOrder: async (parent, args, ctx, info) => await addOrder(args),
    signIn: async (parent, args, ctx, info) => await signIn(args, ctx),
  },
};

module.exports = resolvers;
