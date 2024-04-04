const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/pinterestclone");
const userSchema = mongoose.Schema({
username:String,
name:String,
password:String,
profileimage:String,
number:Number,
Email:String,
boards:{ 
  type:Array,
  default:[]
},
posts:[{
   type:mongoose.Schema.Types.ObjectId,
  ref:"post"
}
]
  

});

userSchema.plugin(plm);
 
module.exports =mongoose.model("users", userSchema);