import { Request , Response } from "express";
import { registerService } from "../services/auth.service";

export async function registerController(req: Request , res:Response){

    const {name , email , password} = req.body;

    const user = await registerService(name,email,password)

    res.status(201).json(user)
}