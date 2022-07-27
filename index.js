require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const articleRouter = require("./routes/articleRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const tagRouter = require("./routes/tagRouter");
const articleTagRouter = require("./routes/articleTagRouter");
const addressUserRouter = require("./routes/addressUserRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/articles", articleRouter);

app.use("/users", userRouter);

app.use("/comments", commentRouter);

app.use("/tags", tagRouter);

app.use("/article-tags", articleTagRouter);

app.use("/address", addressUserRouter);

const portApi = process.env.PORT_API || 3000;

app.listen(portApi, () => {
  console.log(`This app listening at http://localhost:${portApi}`);
});
