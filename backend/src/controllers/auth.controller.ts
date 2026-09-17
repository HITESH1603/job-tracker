import { Request , Response } from "express";
import { registerService ,loginService } from "../services/auth.service";

export async function registerController(req: Request , res:Response){

    const {name , email , password} = req.body;

    const user = await registerService(name,email,password)

    res.status(201).json(user)
}




export async function loginController (req:Request,res:Response ) {

   const  {email,password} = req.body

   const result = await loginService(email,password)

   if(!result){
    return res.status(401).json({
        message: "Invalid email or password"
    })
   }

   res.json(result)
}