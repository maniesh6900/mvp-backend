import z from "zod";

export const adminSignupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().min(2),
    type : z.enum(["ADMIN", "USER"]),

});

export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createCampaignSchma = z.object({
    title : z.string(),
    description : z.string(),
    startedDate : z.date(),
    endDate : z.date(),
    message : z.string(),
    offer : z.enum(["10", "20", "30"]),
});

export const createRefferSchema = z.object({
    email  : z.string().email(),
})
