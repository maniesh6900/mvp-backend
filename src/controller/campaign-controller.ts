import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createCampaignSchma } from "../type";

export const createCampaign = asyncHandler(async(req: Request | any, res: Response) => {
 
   const {title, description, startedDate, endDate, message, offer } = req.body;
    
    if([title, description, startedDate, endDate ].some(field=> field.trim() == " ")) {
        throw new ApiError(405, "data not found");
    }

   const campaign =  await client.campaign.create({
    data : {
        title,
        description,
        startedDate,
        endDate,
        message,
        offer,
   },
});

if(!campaign) {
    throw new ApiError(500, "Server is having problem Please try afer some time !");
   }
   res
   .status(200)
   .json(
    new ApiResponse(200, campaign, "Campaign created successfully"),
   );

});

export const getCampaigns = asyncHandler(async(req: Request | any, res: Response) => {
    const campaigns = await client.campaign.findMany({});
    if(!campaigns) {
        throw new ApiError(500, "Server is having problem Please try afer some time !");
       }
       res
       .status(200)
       .json(
        new ApiResponse(200, campaigns, "Campaigns fetched successfully"),
    );
});