import express from "express";
import { fetchVideos, updateViews ,updateWatchTime } from "../controllers/video.js";

const router = express.Router();

router.get("/fetchVideos", fetchVideos);

router.put("/updateViews/:id", updateViews);

router.put("/updateWatchTime/:id", updateWatchTime)

export default router;
