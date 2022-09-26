import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";

export const fetchVideos = asyncHandler(async (req, res, next) => {
  const data = await Video.aggregate([{ $sort: { viewsCount: -1 } }]);
  res.status(200).json(data);
});
export const updateViews = asyncHandler(async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.updateOne(
    { _id: videoId },
    { $inc: { viewsCount: 1 } }
  );
  res.status(200).json({ message: "updated count" });
});
export const updateWatchTime = asyncHandler(async (req, res, next) => {
const videoId = req.params.id;
const {duration} = req.body
const data = await Video.updateOne({_id: videoId}, { $inc: {watchDuration:duration}})
console.log(data)
})
