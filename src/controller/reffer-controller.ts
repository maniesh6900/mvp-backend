import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const createReffer = asyncHandler(async(req : Request, res : Response)=> {
    const {email} = req.body;
    
    if(!email) {
        throw new ApiError(400, "not Email found");
    }

    const reffer = await client.reffer.create({
        data : {
            email,
        },
    });

    const link = "/task";
    res
    .json(
        new ApiResponse(200, {reffer, link }, "reffer created succsfully"),
    );
});