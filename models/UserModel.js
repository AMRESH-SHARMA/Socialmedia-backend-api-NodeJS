const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema ({                                        
  username:  {
    type:  String,
    required: true,
  }, 
  email: {
    type:  String,
    required: true,
  }, 
  password:  {
    type:  String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema); 

const validate = (user) => {
  const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = { User, validate };

