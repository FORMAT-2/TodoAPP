const mongoose = require('mongoose');
const {Todo} = require('../../schema/todo.mongo.schema')

const createTask =async (req,res)=>{
    const user = req.user;
    const {todoData} = req.body;
    if(!todoData){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter todoData"})
    }
    if(!todoData.taskName ||!todoData.taskDuration){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter taskName and taskDuration"})
    }
    await Todo.create({userId:user._id,taskName:todoData.taskName,taskDuration:todoData.taskDuration});
    res.status(statusCode.Created.statusCode).json({status:"success" , message:"task Created"})
}
const getAllTask = async (req,res)=>{
    const user = req.user;
    const tasks = await Todo.find({userId:user._id});
    if(!tasks){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"No task found"})
    }
    res.status(statusCode.BadRequest.statusCode).json({status:"success" , tasks})
}
const getTaskById = async (req,res)=>{
    const user = req.user;
    const {taskId} = req.body;
    if(!taskId){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter taskId"})
    }
    const task = await Todo.findOne({_id:taskId,userId:user._id});
    if(!task){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"No task found"})
    }
    res.status(statusCode.BadRequest.statusCode).json({status:"success" , task})
}   
const updateTask = async (req,res)=>{
    const user = req.user;
    const {taskId,todoData} = req.body;
    if(!taskId){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter task Id"})
    }
    if(!todoData){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter todo Data"})
    }
    if(!todoData.taskName ||!todoData.taskDuration){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter task Name and task Duration"})
    }
    await Todo.updateOne({_id:taskId,userId:user._id},{taskName:todoData.taskName,taskDuration:todoData.taskDuration});
    res.status(statusCode.BadRequest.statusCode).json({status:"success" , message:"task Updated"})
}
const deleteTask = async (req,res)=>{
    const user = req.user;
    const {taskId} = req.body;
    if(!taskId){
        res.status(statusCode.BadRequest.statusCode).json({status:"error",message:"Please enter task Id"})
    }
    await Todo.deleteOne({_id:taskId,userId:user._id});
    res.status(statusCode.BadRequest.statusCode).json({status:"success" , message:"task Deleted"})
}

module.exports = {createTask,getAllTask,getTaskById,updateTask,deleteTask}