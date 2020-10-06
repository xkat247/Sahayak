const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  body:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'Local',
    enum: ['Local','Global']
  },
  state:{
    type:String,
  },
  city:{
    type:String,
  },
  coords:{
    type:String,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'User'
  }}
  ,
  applicants:{
    type:Array,
    "default":[]

  }
  {
    timestamps:true
  }
)

module.exports = mongoose.model('Job',jobSchema)
