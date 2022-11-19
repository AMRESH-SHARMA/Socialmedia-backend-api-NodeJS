const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema ({                                      
  username:  {
    type: String,
    required: [true, "Please enter a name"],
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

userSchema.methods.generateToken = async function () {
  const jwtToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return jwtToken
}

module.exports  =  mongoose.model("User", userSchema); 