import express from "express";
import { fetchVideos, updateViews } from "../controllers/video.js";

const router = express.Router();

router.get("/fetchVideos", fetchVideos);

router.put("/updateViews/:id", updateViews);

export default router;
