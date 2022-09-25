import asyncHandler from 'express-async-handler'
import Video from '../models/Video.js'

export const fetchVideos = asyncHandler(async(req, res, next)=>{
    const data = await Video.find({})
    res.status(200).json(data)
})