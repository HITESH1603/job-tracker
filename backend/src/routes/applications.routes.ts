import { Router } from "express";
import { getApplications, getApplicationByID, createApplication } from "../controllers/applications.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateApplication } from "../middleware/validateApplication";

const applicationRouter = Router();

applicationRouter.get("/",authMiddleware, getApplications);
applicationRouter.get("/:id", authMiddleware, getApplicationByID);
applicationRouter.post("/",authMiddleware, validateApplication, createApplication);

export default applicationRouter;