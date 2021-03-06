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
    orders: async (parent, args, ctx, info) => await getOrders(ctx),
    EURRate: async () => await getEURRate(),
    deliveryCost: () => 2,
    me: async (parent, args, ctx, info) => await me(ctx),
  },
  Mutation: {
    addOrder: async (parent, args, ctx, info) => await addOrder(args, ctx),
    signIn: async (parent, args, ctx, info) => await signIn(args, ctx),
    signOut(parent, args, ctx, info) {
      ctx.res.clearCookie("token", {
        sameSite: "none",
        secure: true,
      });
      return "Goodbye!";
    },
  },
};

module.exports = resolvers;
