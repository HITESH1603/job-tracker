import { Router } from "express";
import { getApplications } from "../controllers/applications.controller";
const router = Router()

router.get("/",getApplications)

export default router