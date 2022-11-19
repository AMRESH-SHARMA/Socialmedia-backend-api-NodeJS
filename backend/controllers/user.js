const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/Post");
const md5 = require("md5");

exports.register = async (req, res) => {

  var { username, password } = req.body
  if (!username) {
    return res.send('username field is empty')
  } else if (!password) {
    return res.send('password field is empty')
  }

  try {
    User.findOne({ username: (req.body.username) }, async (err, foundUser) => {
      if (foundUser) {
        res.status(406).send("username Already taken! Try another one");
      } else {
        let registerData = new User({
          username: (req.body.username),
          password: md5(req.body.password)
        });
        await registerData.save()
          .then((result) => { res.send('registration done') })
          .catch((err) => { res.send(err) })
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.login = async (req, res) => {
  var { username, password } = req.body
  if (!username) {
    return res.send('username field is empty')
  } else if (!password) {
    return res.send('password field is empty')
  }

  try {

    const foundUser = await User.findOne({
      $and: [
        { username: (req.body.username) },
        { password: md5(req.body.password) }
      ]
    });

    if (foundUser) {
      const jwtToken = await foundUser.generateToken();
      res.status(200).cookie("jwtToken", jwtToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }).json({ msg: "Logged in", foundUser, jwtToken });
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
    const { jwtToken } = req.cookies
    res.status(200).clearCookie("jwtToken").json({ msg: "Logout done" })
    res.end()
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}