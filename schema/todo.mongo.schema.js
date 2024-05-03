const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    taskName:{type:String},
    taskDuration:{type:String},
})

const Todo = new mongoose.model("todoSchema", todoSchema) 

module.exports = {Todo}