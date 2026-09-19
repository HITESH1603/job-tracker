import { Request,Response,NextFunction } from "express";
import { registerSchema } from "../validation/auth.schema";
import {z} from "zod";

export function validateRegister(req:Request,res:Response,next:NextFunction){

    const result = registerSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"Validation failed",
            errors: z.flattenError(result.error).fieldErrors
        })
    }


      req.body  = result.data;
      next()
}
