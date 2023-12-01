import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiError} from "../utils/APIError.js"
import {User} from "../models/user.model.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponce.js"

import { application } from 'express';

const registerUser = asyncHandler(async (req, res)=>{
         const {fullname, email, username, password} = req.body;
         console.log("email:", email);

         if(
            [fullname, email, username, password].some((field) => field?.trim() === "")
         )
         {
            throw new ApiError(400, "All fields are required")
         }

         const existingUser = User.findOne({
            $or: [{email}, {username}]
         })

         if(existingUser)
         {
            throw new ApiError(409, "User with email or username already exists")
         }

         const avatarLocalPath = req.files?.avatar[0]?.path;
         const coverImageLocalPath = req.files?.coverImage[0]?.path;

         if(!avatarLocalPath)
         {
            throw new ApiError(400, "Avatar is required")
         }

        const avatar = await uploadFileOnCloudinary(avatarLocalPath)
        const coverImage = await uploadFileOnCloudinary(coverImageLocalPath)
        
        if(!avatar)
        {
            throw new ApiError(400, "Avatar is required")
        }

        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser)
        {
            throw new ApiError(500, "Something went wrong while registering")
        }

        res.status(201).json(
            new ApiResponse(200, createdUser, "User created successfully")
        )
})

export {registerUser}