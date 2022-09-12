const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function toLower(str) {
  return str.toLowerCase();
}
const userSchema = new mongoose.Schema ({                                      
  username:  {
    type: String,
    required: [true, "Please enter a name"],
  }, 
  email: {
    type: String,
    set: toLower,
    required: true,
    unique: [true, "Email already exists"]
  }, 
  password:  {
    type: String,
    required: true,
    select: false
  },
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }
  ],
});

// const User = mongoose.model("User", userSchema); 

const validate = (user) => {
  const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(user);
};


userSchema.methods.generateToken = async function () {
  const jwtToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return jwtToken
}

// module.exports  = { User, validate};
module.exports  =  mongoose.model("User", userSchema); 