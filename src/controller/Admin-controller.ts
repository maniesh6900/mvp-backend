import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { adminLoginSchema, adminSignupSchema } from "../type";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";


export const adminSignup = asyncHandler(async(req : Request, res : Response)=> {
    const parsedData = adminSignupSchema.safeParse(req.body);
    if(!parsedData.success) {
        throw new ApiError(409, "Invalid input");
    }

    const existed = await client.user.findFirst({
        where :{ 
            name : parsedData.data.name,
        },
    });
    if(existed) {
        throw new ApiError(409, "name is alreadyy taken");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);
    const user = await client.user.create({
        data : {
            name : parsedData.data.name,
            email : parsedData.data.email,
            password : hashedPassword,
        },
    });
    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as string);
    res
    .status(201)
    .cookie("token", token, {
        httpOnly : true,
        secure : true,
    })
    .json(
        new ApiResponse(201, {user : user , token}, "User created successfully"),
    );

});

export const adminLogin = asyncHandler(async(req : Request, res : Response)=> {
    const parsdedData = adminLoginSchema.safeParse(req.body);
    if(!parsdedData.success) {
        throw new ApiError(409, "Invalid input");
    }
    const user = await client.user.findFirst({
        where :{
            email : parsdedData.data.email,
        },
    });
    if(!user) {
        throw new ApiError(409, "User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(parsdedData.data.password, user.password);
    if(!isPasswordCorrect) {
        throw new ApiError(409, "Invalid password");
    }
    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as string );
    res
    .status(201)
    .cookie("token", token, {
        httpOnly : true,
        secure : true,
    })
    .json(
        new ApiResponse(201,{ user : user, token} , "User logged in successfully"),
    );
});