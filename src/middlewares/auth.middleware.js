import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";


const auth = asyncHandler(async (req, _res,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    console.log("token", token);
    

    if(!token) {
        throw ApiError.unauthorized("Access token not found.Please log in.");
    }
    let decodedToken;
    try {
         decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw ApiError.unauthorized('Invalid or expired access token');
    }
    if(!decodedToken?.id) {
        throw ApiError.unauthorized("Token does not contain valid user info.");
    }
    const user =await User.findById(decodedToken.id).select("-password -__v -createdAt -updatedAt -passwordResetToken -passwordResetExpires");
    if(!user) {
        throw ApiError.unauthorized("User no longer exists");
    }
    req.user = user;
    next();
})

export default auth;