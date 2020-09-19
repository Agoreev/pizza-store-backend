const {
  getPizzas,
  signIn,
  me,
  addOrder,
  getOrders,
} = require("./dataSources/mongo");
const { getEURRate } = require("./dataSources/currency");

const resolvers = {
  Query: {
    pizzas: async () => await getPizzas(),
    pizzaByIds: async (parent, args, ctx, info) => await getPizzaByIds(args),
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
