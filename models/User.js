const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId:{
    type:String,
    required:true
  },
  displayName:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  phone:{
    type:String
  },
  image:{
    type:String,
  }}
  ,
  {
    timestamps:true
  }
)

module.exports = mongoose.model('User',UserSchema)
