import { Router } from "express";
import { getApplications, getApplicationByID, createApplication, updateApplication } from "../controllers/applications.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateApplication } from "../middleware/validateApplication";
import { validateApplicationUpdate } from "../middleware/validateApplicationUpdate";

const applicationRouter = Router();

applicationRouter.get("/",authMiddleware, getApplications);
applicationRouter.get("/:id", authMiddleware, getApplicationByID);
applicationRouter.post("/",authMiddleware, validateApplication, createApplication);
applicationRouter.patch("/:id", authMiddleware, validateApplicationUpdate, updateApplication);

export default applicationRouter;