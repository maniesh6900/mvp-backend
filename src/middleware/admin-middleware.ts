import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErorr";
import { client } from "../prisma";



export const adminMiddlware = async function(req : any, _ : any, next : NextFunction) {
        try {
            const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
            if(!token){
                throw new ApiError(400, "unauthorized Token");
            }
              const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id : string};
            
            
            const admin = await client.user.findFirst({
                where : {
                    id : decoded.id,
                },
            });

            if(!admin) {
                throw new ApiError(405, "not a verify User");
            }

            if(admin.type !== "ADMIN") {
                throw new ApiError(405, "User is not a Vender");
            }
            req.admin = admin;
            next();
        } catch (error) {
            console.error(error);
            throw new ApiError(405, `middlerware failed with the error ${error} `);
        }
}