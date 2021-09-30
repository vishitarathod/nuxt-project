// const mongoose=require('mongoose');
import mongoose from 'mongoose'

//define role schema
const roleSchema=new mongoose.Schema({
    roleName:{ type: String ,require:true},
})

//generate post model
const Role=mongoose.model('Role',roleSchema)

export default Role