import { Router } from "express";
import { validateRegister } from "../middleware/validateRegister";
import { validateLogin } from "../middleware/validateLogin";
import { registerController,loginController } from "../controllers/auth.controller";
import { loginRateLimiter } from "../middleware/loginRateLimiter";

const authRouter = Router()

authRouter.post("/register",validateRegister,registerController)
authRouter.post("/login",loginRateLimiter, validateLogin ,loginController)

export default authRouter;