import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
//define user schema
const userSchema =new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        require:true,
    },
    roles:{
        type: String,
        require:true,
    }
})

userSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
//generate user model
const User=new mongoose.model('user',userSchema)

export default User;