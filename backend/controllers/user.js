import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";

export const uploadVideo = asyncHandler(async (req, res, next)=>{
    const {url,userId}=req.body
    const response = await Video.create({
        user:userId,
        url
    })
    res.status(201).json({message:'Video Uploaded Successfully'})
})