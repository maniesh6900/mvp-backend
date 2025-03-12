import { Router } from "express";
import { adminLogin, adminSignup } from "../controller/Admin-controller";
const router = Router();


router.route("/signup").post(adminSignup);
router.route("/login").post(adminLogin);


export default router;