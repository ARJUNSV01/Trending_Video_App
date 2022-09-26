import jwt from "jsonwebtoken";
import { createError } from "./createError.js";


export const authenticateToken = (req,res,next) => {
   
    // console.log(req.headers)
    const{accesstoken} = req.headers
    // console.log(accesstoken,'access token');
    if(!accesstoken) return next(createError(401,'No token'))
    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        if(err) {
            console.log(err);
            return res.status(403).json({message:'Invalid token'})
        }else{

            next()
        }
       })
    }
