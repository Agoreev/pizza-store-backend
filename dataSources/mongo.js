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
  name: String,
  phone: String,
  email: String,
  city: String,
  street: String,
  house: String,
  deliveryMethod: String,
  currency: String,
  rate: Number,
  totalPrice: Number,
  items: [
    { pizza: { type: ObjectId, ref: "pizza" }, price: Number, count: Number },
  ],
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

const getOrders = async (ctx) => {
  //check if there is a current userId
  if (!ctx.req.userId) {
    return null;
  }

  const orders = await Order.find({ user: ctx.req.userId })
    .populate("user")
    .populate("items.pizza")
    .exec();
  return orders;
};

const addOrder = async ({ order }, ctx) => {
  const items = order.items;
  var i;
  for (i = 0; i < items.length; i++) {
    items[i].pizza = items[i]["pizzaId"];
    delete items[i].pizzaId;
  }
  const orderWithUser = { ...order, user: ctx.req.userId, items };

  const newOrder = new Order(orderWithUser);
  const savedOrder = await newOrder.save();
  const populatedOrder = await Order.findOne({ _id: savedOrder._id })
    .populate("user")
    .populate("items.pizza")
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
  if (!ctx.req.userId) {
    return null;
  }
  return await User.findOne({ _id: ctx.req.userId });
};

module.exports = {
  getPizzas,
  getOrders,
  addOrder,
  signIn,
  me,
  getPizzaById,
};
