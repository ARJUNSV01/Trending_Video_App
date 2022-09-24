import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { createError } from "../middlewares/createError.js";
import User from "../models/User.js";
import generateToken from "../config/generateToken.js";

export const userSignUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
 
  if (!name || !email || !password) {
    return next(createError(400, "Please enter all the fields"));
  }
  const UserExists = await User.findOne({ email: email });
  if (UserExists) return next(createError(409, "User already exists"));
  
  const user = await User.create({
    name: name,
    email: email,
    password: await bcrypt.hash(password, 10),
  });

  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
  })


});
export const userLogin = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const {email,password}=req.body
    const user = await User.findOne({ email:email });
    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    
    if (!isPasswordCorrect) return next(createError(400, "Invalid password!"));
   
    const { Password, ...otherDetails } = user._doc;
    // res
    //   .cookie("access_token", token, {
    //     expire: new Date() + 9999999999999,
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ ...otherDetails });
    res.status(200).json({
      ...otherDetails,
      token:generateToken()
    })
  });
