import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'
import cors from 'cors'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import userRoutes from './routes/userRoutes.js'
import videoRoutes from './routes/videoRoutes.js'


const app = express();
dotenv.config()
connectDB()
app.use(cors({origin:true,credentials:true}));
app.use(cookieParser())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API running...");
})

app.use('/api/users',userRoutes)
app.use('/api/videos',videoRoutes)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

const PORT = process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`Server started on PORT ${PORT}`.yellow)
})