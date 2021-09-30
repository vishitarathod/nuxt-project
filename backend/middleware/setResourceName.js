class ResourceName{

    //set resource name
    setResourceNameUser=async(req,res,next)=>{
        res.locals.resourceName="Users"
        next();
    }
    setResourceNamePost=async(req,res,next)=>{
        res.locals.resourceName="Posts"
        next();
    }
}

export default new ResourceName();