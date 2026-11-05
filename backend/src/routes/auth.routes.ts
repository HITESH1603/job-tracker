import { Router } from "express";
import { validateRegister } from "../middleware/validateRegister";
import { validateLogin } from "../middleware/validateLogin";
import { registerController, loginController,  getCurrentUserController } from "../controllers/auth.controller";
import { loginRateLimiter } from "../middleware/loginRateLimiter";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = Router()

authRouter.post("/register",validateRegister,registerController)
authRouter.post("/login",loginRateLimiter, validateLogin ,loginController)
authRouter.get("/me", authMiddleware, getCurrentUserController);

export default authRouter;