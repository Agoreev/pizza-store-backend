const mongoose = require("../config/db");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pizzaSchema = new Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
});

const userSchema = new Schema({
  name: String,
  phone: String,
});

const orderSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  address: String,
  orderContent: [{ pizza: { type: ObjectId, ref: "pizza" }, count: Number }],
  totalPrice: Number,
});

const Pizza = mongoose.model("pizza", pizzaSchema);
const User = mongoose.model("user", userSchema);
const Order = mongoose.model("order", orderSchema);

const getPizzas = async () => {
  return await Pizza.find({});
};

const getPizzaById = async ({ pizzaId }) => {
  return await Pizza.findOne({
    _id: pizzaId,
  });
};

const getOrders = async ({ user }) => {
  const orders = await Order.find({ user: user })
    .populate("user")
    .populate("orderContent.pizza")
    .exec();
  return orders;
};

const addOrder = async ({ order }) => {
  const newOrder = new Order(order);
  const savedOrder = await newOrder.save();
  const populatedOrder = await Order.findOne({ _id: savedOrder._id })
    .populate("user")
    .populate("orderContent.pizza")
    .exec();
  return populatedOrder;
};

const signIn = async ({ name, phone }, ctx) => {
  //1. Find the user in DB by phone, if not exist insert it
  const user = await User.findOneAndUpdate(
    { phone },
    { name },
    {
      new: true,
      upsert: true,
    }
  );

  //2. generate token and place it in cookies
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  ctx.res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  return user;
};

const me = async (ctx) => {
  //check if there is a current userId
  if (!ctx.request.userId) {
    return null;
  }
  return await User.findOne({ _id: ctx.request.userId });
};

module.exports = {
  getPizzas,
  getOrders,
  addOrder,
  signIn,
  me,
  getPizzaById,
};
