import { Request,Response,NextFunction } from "express";
import { registerSchema } from "../validation/auth.schema";

export function validateRegister(req:Request,res:Response,next:NextFunction){

    const result = registerSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"Validation failed",
            errors: result.error.flatten().fieldErrors
        })
    }


      req.body  = result.data;
      next()
}
