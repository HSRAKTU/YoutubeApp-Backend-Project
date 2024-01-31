import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async(req,res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists: username, email
    //check for images, check for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {fullName, email, username, password} = req.body
    console.log("email:", email);

    //validation
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")  //agar field hai or trim hone ke baad bhi empty hai then return true
    ){
        throw new ApiError(400, "All fields are required.")
    }

    //validation
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //validation for avatar
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    //uploading on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    //double validation
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    //Creating user object & entry in database

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //crafting Response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!")
    )

} )

export {registerUser}