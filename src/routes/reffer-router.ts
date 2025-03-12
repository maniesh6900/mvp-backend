import { Router } from "express";
import { createReffer } from "../controller/reffer-controller";
const router = Router();


router.route("/create").post(createReffer)

export default router