import express from 'express';
import userController from '../controller/userController.js';
import resourceName from '../middleware/setResourceName.js';
import postController from '../controller/postController.js'
import authController from '../controller/authController.js';
import {verifyAccessToken} from '../helper/jwt_helper.js';
import validator from '../validator/validate.js';
import  roleAuth  from '../middleware/roleMiddleware.js';
const router=express.Router();

//registration api
router.post('/signup',validator.validateRegisterUser,authController.registerUser)

//login api
router.post('/auth/login',validator.validateLoginUser,authController.loginUser)

//forgot password api
router.post('/forgot',authController.forgotPassword)

//reset password api
router.patch('/reset',authController.resetPassword)

//get all users which have user role api
router.get('/users/items',verifyAccessToken,resourceName.setResourceNameUser,roleAuth,userController.getUsers)

//update user api
router.put('/update-user/:id',verifyAccessToken,resourceName.setResourceNameUser,roleAuth,userController.updateUser)

//add user api
router.post('/add-user',verifyAccessToken,resourceName.setResourceNameUser,roleAuth,userController.addUser)

//delete user api
router.delete('/delete-user/:id',verifyAccessToken,resourceName.setResourceNameUser,roleAuth,userController.deleteeUser)

//get user data for edit api
router.get('/edit-user/:id',verifyAccessToken,userController.getUserForEdit)

//get posts for perticular user api
router.post('/getuserpost/items',verifyAccessToken,resourceName.setResourceNamePost,roleAuth,postController.getUserPost)

//add post api
router.post('/addpost',verifyAccessToken,resourceName.setResourceNamePost,roleAuth,postController.addPost )

//get all post api
router.get('/post/items',verifyAccessToken,resourceName.setResourceNamePost,roleAuth,postController.getPost)

//delete post api
router.delete('/delete-post/:id',verifyAccessToken,resourceName.setResourceNamePost,roleAuth,postController.deletePost)

//get post data for edit api
router.get('/edit-post/:id',verifyAccessToken,postController.getPostForEdit)

//update post api
router.put('/update-post/:id',verifyAccessToken,resourceName.setResourceNamePost,roleAuth,postController.updatePost)

//get permissions
router.get('/get-permission',verifyAccessToken,userController.getPermission)

//refresh the token api
router.post('/refresh-token',authController.refreshToken)


export default router
