import express from 'express';
import dotenv from 'dotenv';

export const onlyOwner=(req,res,next)=>{
    const ownwerId=process.env.OWNER_ID;
    if(req.user && req.user._id.toString()===ownwerId){
        return next();
    }else {
        res.status(403).json({ message: 'Access denied: Only owner can add menu items.' });
    }
}






