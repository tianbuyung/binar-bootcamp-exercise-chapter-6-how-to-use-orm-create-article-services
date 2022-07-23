const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();

const Model = require("./models");
const { Account, Article, Comment } = Model;
const bodyParser = require("body-parser");
const articleRouter = require("./routes/articleRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const { connectRedis } = require("./cached/redis");

connectRedis();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/articles", articleRouter);

app.use("/users", userRouter);

app.use("/comments", commentRouter);

app.listen(3000);
