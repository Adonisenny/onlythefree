import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import user from '../models/user.js'
import { ErrorHandler } from '../utils/errorHandler.js';


export const register = async(req,res,next) => {
    
   try {
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.password,salt);

const newuser = new user({
    username:req.body.username,
    email:req.body.email,
    password:hash
})
await newuser.save()
res.status(200).send("user has been created")



   } catch (error) {
    next(error)
   }

}

export const login = async(req,res,next) => {
    try {
        const User = await user.findOne({username:req.body.username})
        if(!User) return next(ErrorHandler(404, 'user does not exist'))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password)
        if(!isPasswordCorrect) return next(ErrorHandler(400, 'Password or username incorrect'))
        const token = jwt.sign({id:User._id,isAdmin:User.isAdmin}, process.env.mystash)
        const {password,isAdmin, ...otherdetails} =User._doc;
        res.cookie('access_token', token,{
            httpOnly:true,
            samesite:'lax',
            secure:false
        }).
        status(200).json(otherdetails)
    } catch (error) {
        next(error)
    }
}
export const logout = async(req,res,next)=>{
    try {
        res.clearCookie("access_token", {
            sameSite:"none",
            secure:true
        }).status(200).json("You have been logged out")
    } catch (error) {
        res.status(500).json({error:"couldn't logout"})
    }
}
export const GetAllUsers = async(req,res,next) => {
    try {
        const users = await user.find({}).sort({createdAt:-1})
        res.json(users)
    } catch (error) {
        res.status(404).json({error:"users not found"})
    }
}
