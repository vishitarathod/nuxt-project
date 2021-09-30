import mongoose from 'mongoose'


//define post schema
const postSchema =new mongoose.Schema({
    userId:{
        type: String,
        require:true,
    },
    title:{
        type: String,
        require:true,
    },
    discription:{
        type: String,
        require:true,
    },
})

//generate post model
const Post=new mongoose.model('post',postSchema)

export default Post