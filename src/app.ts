import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors({origin : "*"}));
app.use(express.json());
app.use(cookieParser());

// importing routes 
import AdminRouter from "./routes/user-routes";
import CampaignRoutes from "./routes/campaign-routes";
import RefferRouter from "./routes/reffer-router";

// init routes
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/campaign", CampaignRoutes);
app.use("/api/v1/reffer", RefferRouter);

app.get("/get", (req, res) => {
    res.send("Hello World!");
});


export {app};