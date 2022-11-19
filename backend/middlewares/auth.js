const User = require("../models/User")
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    // const { jwtToken } = req.cookies;
    const jwtToken = req.header('authorization');
    console.log("jwtToken",jwtToken)
    if (!jwtToken) {
      return res.status(406).json({ mgs: "Please login first, jwt token not found" })
    } else {
      const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = await User.findById(decode._id)
      next()
    }
  } catch (err) {
    console.log("err")
    res.send(err)
  }

};