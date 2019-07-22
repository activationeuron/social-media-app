const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const valid = require("express-validator");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const mongoose = require("mongoose");
// ! database connections
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true },

  () => {
    console.log("DB connected");
  }
);

// all the routes
const postRoutes = require("./routers/post");
const authRoutes = require("./routers/auth");

//* middleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(valid());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("app Started at port", PORT);
});
