const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userMail:{type:String},
    userPhoneNumber:{type:String},
    userName:{type:String},
    userDob:{type:Date},
    password:{type:String},
    token:{type:String}
})

const User = new mongoose.model("userSchema", userSchema) 

module.exports = {User}