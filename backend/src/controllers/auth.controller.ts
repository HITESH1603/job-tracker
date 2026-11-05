import { Request, Response } from "express";
import {
  registerService,
  loginService,
  getCurrentUserService,
} from "../services/auth.service";

export async function registerController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = await registerService(name, email, password);

  res.status(201).json(user);
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  if (!result) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  res.json(result);
}

export async function getCurrentUserController(req: Request, res: Response) {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const userId = req.userId;

  const user = await getCurrentUserService(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
}
