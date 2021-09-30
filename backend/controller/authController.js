import { isEmailExist } from "../validator/authValidation.js";
import { singleEmailAlowed } from "../validator/authValidation.js";
import { signAccessToken,signReferesToken ,veifyRefreshToken,verifyAccessToken} from "../helper/jwt_helper.js";
import User from "../model/user.js";
import Role from "../model/rols.js";
import transporter from "../helper/mail.js";
import { verifyPassword } from "../helper/verifyPassword.js";

class AuthController{
      //user registration
      registerUser=async(req,res)=>{
        try {
            //check user alreday register or not
            const data= await singleEmailAlowed(req.body.email);
            const user = new User(req.body);

            //find role
            var roles=await Role.findOne({roleName:req.body.roles}).select('_id');

            //set roleId
            user.roles = roles._id;

            //save the user
            const saveUser = await user.save();
            
            //return saved user
            res.json(saveUser)
        }catch (e) {
          console.log("=========",e.details)
          res.status(400).send({message: "registration error", error: e});
           
        }
    }
    loginUser=async(req,res)=>{
        try{

            const email= await isEmailExist(req.body.email)
          
            const user =await User.findOne({email})
                await verifyPassword(req.body.password,user.password)
                    const roles=user.roles
                    console.log("user......",user.id)
                    //generate access token
                    const token=await signAccessToken(user.id)
        
                    //generate refresh token
                    const refreshToken=await signReferesToken(user.id)
        
                    const userID=user.id
                    console.log('login successfull')
                   return res.json({token,refreshToken,roles,userID})
           
            

        }catch(e){
            if(!e){
                res.status(400).send({message: "incorrect email or password", error: "incorrect email or password"});
            }
          res.status(400).send({message: "login error", error: e});
        }
    }
    forgotPassword=async(req,res)=>{
        try {
             //check for user exist or not
            const user= isEmailExist(req.body.email)

            //generate access token which send in mail
            const token=await signAccessToken(user.id);

            var mail={
                from: process.env.EMAIL,
                to:req.body.email,
                subject: "forget password",
                html:`${token}`
                
            };
            //send mail
            transporter.sendMail(mail,(err,info)=>{
                if(err) console.log(err);
                else console.log('email sent : '+ info.response);
    
            })
             }catch (e) {
              res.status(400).send({message: "email error", error: e});
        }
    }
    refreshToken=async(req,res)=>{

        console.log(req.body)
        const refreshToken=req.body.token;
        if(!refreshToken) throw Error();
        //verify refresh token
        const userId=await veifyRefreshToken(refreshToken)
        //generate new access token
        console.log(userId);
        const accToken=await signAccessToken(userId);
        //generate new refresh token
        const refToken=await signReferesToken(userId)
        res.json({accToken,refToken})
      
    }

    resetPassword=async(req,res)=>{
        console.log(req.body)

        //verify token for reset password
        const id= await verifyAccessToken(req.body.token)
        console.log(id)

        //update the password
        const result= await User.updateOne({_id:id},{$set:{password:req.body.password}})
       }
}

export default new AuthController();