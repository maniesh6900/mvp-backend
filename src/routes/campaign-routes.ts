import { Router } from "express";

import { createCampaign, getCampaigns } from "../controller/campaign-controller";
import { adminMiddlware } from "../middleware/admin-middleware";

const router = Router();

router.route("/create").post( createCampaign);
router.route("/get").get( getCampaigns);


export default router;