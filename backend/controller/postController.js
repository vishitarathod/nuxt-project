import Post from "../model/post.js";
import paginate from 'jw-paginate'

class PostController{
  //add post 
    addPost=async(req,res)=>{
      const post = new Post({userId:res.locals.userID,title:req.body.title,discription:req.body.discription});
       const savePost = await post.save();
       res.send(savePost)
   }
   //get post for perticular user
   getUserPost=async(req,res)=>{
     console.log(req.body)
     console.log(req.body.userId)
       const items=await Post.find({userId:req.body.userId})
      console.log('items',items)
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        // console.log("++++++++++++",pager)
        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        console.log(pageOfItems)
        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
   }

   //get total post
   getPost=async(req,res)=>{
        const items= await Post.find({})
        // console.log(items)
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        // console.log("++++++++++++",pager)
        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        console.log(pageOfItems)
        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
    }

    //delete post
   deletePost=async(req,res)=>{
       Post.findByIdAndRemove(req.params.id, (error, data) => {
           if (error) {
              throw error
           } else {
             res.status(200).json({
               msg: data
             })
           }
         })
   }

   //update post
   updatePost=async(req,res)=>{
       Post.findByIdAndUpdate(req.params.id, {
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

   //get perticular post for edit
   getPostForEdit=async(req,res)=>{
    const data=await Post.findById(req.params.id)
    res.send(data)
}
}

export default new PostController();