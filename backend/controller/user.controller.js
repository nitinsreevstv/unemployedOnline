import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) =>{
    try {
        const {fullName, email, phoneNumber, password} = req.body;
        if(!fullName || !email || !phoneNumber || !password){
            return res.status(400).json({
                message:'Something is missing.',
                success:false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User is already exist',
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber:hashedPassword,
            password
        })
        return res.status(200).json({
            message:`Welcome to UnemployedOnline!`,
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}
export const logIn = async(req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:'Please input required value',
                success:false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'Please register first',
                success:false
            })
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.status(400).json({
                message:'Password incorect.',
                success:false
            })
        }

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

        user = {
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullName}`,
            user,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}