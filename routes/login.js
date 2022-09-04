const { User } = require('../models/UserModel');
const express = require("express");
const router = express.Router();
// const md5 = require("md5");

router.post("/login", async (req,res) => {
  console.log(req.body)
  try {
    
    User.findOne({username : (req.body.username), password : (req.body.password)},(err, foundUser) => {
      if (foundUser) {
        res.send("Logged in!");
      } else {
        res.status(404).send("Wrong Username OR password");
      };
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }

});

module.exports = router;