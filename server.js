require("dotenv").config();
const express = require("express");
const register = require("./routes/register");
const login = require("./routes/login");
const pwdReset = require("./routes/passwordReset");
const connection = require("./db");

const app = express();
connection()
app.use(express.json());

app.use("/", register);
app.use("/", login);
app.use("/", pwdReset);




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));