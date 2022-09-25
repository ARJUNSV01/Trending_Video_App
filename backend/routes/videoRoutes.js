import express from 'express';
import { fetchVideos } from '../controllers/video.js';

const router = express.Router();

router.get('/fetchVideos',fetchVideos)

export default router;