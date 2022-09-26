import express from "express";
import { userLogin, userSignUp } from "../controllers/auth.js";
import { uploadVideo } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", userSignUp);

router.post("/login", userLogin);

router.post("/uploadVideo", uploadVideo);

export default router;
