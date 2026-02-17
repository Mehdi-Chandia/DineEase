import User from "../models/user.model.js"
import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Signup=async (req,res)=>{
    try {
        const {name,email,phone,password,address}=req.body
        if(!name || !email || !phone || !password || !address){
           return  res.status(400).json({ message: "all fields are required" })
        }
        const user=await User.findOne({email})
        if (user){
           return res.status(400).json({ message: "user already exists with this email" })
        }
        const hashPasswprd=await bcrypt.hash(password,10)
const createUser= new User(
    {
        name,
        email,
        password:hashPasswprd,
        address,
        phone
    }
)
        await createUser.save()
        res.status(201).json({ message: "User registered successfully" });

    }catch (error){
        console.log("signup failed ",error.message)
        res.status(500).json({ message: "Server error" });
    }
}

export const Login=async (req,res)=>{
    try {
        const{email,password}=req.body
        if(!email || !password){
            return  res.status(400).json({ message: "email and password is required" })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "invalid username or password" })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({ message: "invalid username or password" })
        }

        //creating token

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie("token",token,
            {
            httpOnly:true,
            sameSite: 'Lax'
            });

        return res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    }catch (error){
        console.log("login failed ",error.message)
        res.status(500).json({ message: "Server error" });
    }
}