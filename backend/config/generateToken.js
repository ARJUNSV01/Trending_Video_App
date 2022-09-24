import jwt from "jsonwebtoken";

const generateToken = (id) =>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'})
}
export default generateToken;