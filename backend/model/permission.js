import mongoose from 'mongoose'

//define permission schema
const permissionSchema=new mongoose.Schema({
    permission:{
        read:Boolean,
        write:Boolean,
        update:Boolean,
        delete:Boolean,
    },
    roleID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    resourceID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resource'
    },
   
})

//generate permission model
const Permission=mongoose.model('Permission',permissionSchema);
 
export default Permission