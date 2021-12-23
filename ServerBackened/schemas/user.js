const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
   name:{
       type:String,
       unique: [true,"Already Exist"],
       required: true
   },
   email:{
       type: String,
       unique: [true,"Already Exist"],
       required: [true, "please add email"]
   },
   password:{
       type:String,
       required: [true,"Please Enter Password"],
       minlength: [6,"Password Length is minimum 6"],
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
})
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
})
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE 
    });
}

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password); 
}

 
module.exports = mongoose.model('user',UserSchema);