import User from '../model/user.js';
import paginate from 'jw-paginate';
import { singleEmailAlowed } from "../validator/authValidation.js";
import Permission from '../model/permission.js';
import Resource from '../model/resource.js';
class UserController{
  //add user
    addUser=async(req,res)=>{
      try {
        const data= await singleEmailAlowed(req.body.email);
        const user = new User(req.body);
        const saveUser = await user.save();
        console.log(saveUser)
        res.json({saveUser})
    }catch (error) {
        console.log(error)
    }
  }

  //get users which have user role
  getUsers=async(req,res)=>{
    const items= await User.find({roles:"611fdd096066bf93f57ed7f8"})

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;
  
    // get pager object for specified page
    const pageSize = 5;
    const pager = paginate(items.length, page, pageSize);
  
    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    console.log(pageOfItems)
    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
  }

  //delete the user
    deleteeUser=async(req,res)=>{
        User.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                throw error
            } else {
              res.status(200).json({
                msg: data
              })
            }
          })
    }
 //update the user
    updateUser=(req,res)=>{
      User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          throw error
        } else {
          res.json(data)
          console.log('Student successfully updated!')
        }
      })
    }
     //get perticular user for edit
    getUserForEdit=async(req,res)=>{
        const data=await User.findById(req.params.id)
        res.send(data)
    }
    getPermission=async(req,res)=>{
      const data=await User.findById(res.locals.userID)
      const resID=await Resource.findOne({resourceName:req.query.resourceName})
      const {permission}=await Permission.findOne({roleID:data.roles,resourceID:resID._id})
      res.send(permission)
  }
}

export default new UserController();
