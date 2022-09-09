const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/Post");

exports.register = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) return res.status(406).send(error.details[0].message);

    User.findOne({ username: (req.body.username) }, async (err, foundUser) => {
      if (foundUser) {
        res.status(406).send("username Already taken! Try another one");
      } else {
        User.findOne({ email: (req.body.email) }, async (err, foundemail) => {
          if (foundemail) {
            res.status(406).send("email Already taken! Try another one");
          } else {
            let registerData = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            });
            await registerData.save()
              .then((result) => { res.send(result) });
          }
        });
      };
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      const authtoken= await foundUser.generateToken();
      res.status(200).cookie("authtoken", authtoken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }).json({ msg: "Logged in", foundUser, authtoken });
    } else {
      res.status(404).send("Wrong Username OR password");
    };
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}

exports.logout = async (req, res) => {
  try {
    const {authtoken} =req.cookies
    res.status(200).cookie(authtoken,null).json({msg: "Logout done"})
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}