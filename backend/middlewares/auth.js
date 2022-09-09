const User = require("../models/User")
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req,res,next)=>{
  try {
    const {authtoken} = req.cookies;
    if(!authtoken) {
      return res.status(406).json({mgs:"Please login first, jwt token not found"})
    }
    const decode = await jwt.verify(authtoken,process.env.JWT_SECRET);
    req.user = await User.findById(decode._id)
    next();
  } catch (err) {
    console.log("err")
    res.send(err)
  }

};