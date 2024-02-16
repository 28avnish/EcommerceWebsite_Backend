const mongoose = require('mongoose');

const UserSchema= new  mongoose.Schema({
    firstname:String,
    lastname: String,
    email:String,
    password:String
})

const EmployeeModel = mongoose.model("users",UserSchema)
module.exports = EmployeeModel