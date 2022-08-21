const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
   username:{type:String,required:true,trim:true},
   email:{type:String,required:true,uniquie:true},
   password:{type:String,required:true},
   photo:{type:String},
   isAdmin:{type:Boolean,default:false},
})
module.exports=mongoose.model('User',userSchema);