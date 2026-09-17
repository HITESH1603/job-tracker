import { Router } from "express";
import { validateRegister } from "../middleware/validateRegister";
import { registerController } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post("/register",validateRegister,registerController)

export default authRouter