import { Router } from "express";
import { getApplications } from "../controllers/applications.controller";
import { getApplicationByID } from "../controllers/applications.controller";
const applicationRouter = Router()

applicationRouter.get("/",getApplications)
applicationRouter.get("/:id",getApplicationByID)

export default applicationRouter