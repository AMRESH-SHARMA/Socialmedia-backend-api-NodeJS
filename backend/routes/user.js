const express = require("express");
const { register, login, logout } = require("../controllers/user");

const router = express.Router();

router.route('/')
.get(function (req, res, next) {
    res.send("GET request called, connected  to cloud");
});

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").delete(logout)

module.exports = router;
