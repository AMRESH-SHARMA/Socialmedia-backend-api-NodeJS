const { User, validate } = require('../models/UserModel');
const express = require("express");
const router = express.Router();
// const md5 = require("md5");

router.get("*", (req,res)=>{res.status(404).send("URL does not exist")});

router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    User.findOne({username : (req.body.username)},async (err, foundUser) => {
      if (foundUser) {
        res.status(406).send("username Already taken! Try another one");
      } else {
        let data =  new User({
          username: (req.body.username),               //You can use md5 hashing
          email: (req.body.email),
          password: (req.body.password)
        });
        await data.save().then((result)=>{res.send(result)});
      };
    });


  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/l", async (req,res) => {
  console.log(req.body)
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    User.findOne({email : (req.body.email), password : (req.body.password)},(err, foundUser) => {
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