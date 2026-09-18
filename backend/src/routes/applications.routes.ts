import { Router } from "express";
import { getApplications } from "../controllers/applications.controller";
import { getApplicationByID } from "../controllers/applications.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const applicationRouter = Router()

applicationRouter.get("/",authMiddleware,getApplications)
applicationRouter.get("/:id", authMiddleware ,getApplicationByID)

export default applicationRouter