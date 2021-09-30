import mongoose from 'mongoose'

//define post schema
const resourceSchema=new mongoose.Schema({
    
    resourceName: {
       type: String, required: true 
      },
    });

    //generate resource model
  const Resource= mongoose.model('Resource',resourceSchema);


  export default Resource