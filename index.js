require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({ ...req }),
});

const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
});

app.listen(
  {
    port: process.env.PORT || 4000,
  },
  () => console.log(`🚀 Server ready at /${server.graphqlPath}`)
);
