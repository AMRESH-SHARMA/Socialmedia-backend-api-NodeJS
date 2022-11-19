const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors())

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./backend/config/config.env" });
}

//____
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//____
const post = require("./routes/post");
const user = require("./routes/user");
//____
app.use("/", user);
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app
