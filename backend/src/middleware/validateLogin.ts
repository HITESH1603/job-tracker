import { Request,Response,NextFunction } from "express";
import { loginSchema } from "../validation/login.schema";
import {z} from "zod";

export function validateLogin(req:Request ,res:Response, next:NextFunction){

    const result = loginSchema.safeParse(req.body);

    if(!result.success){
       return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(result.error).fieldErrors
       })
    }

    req.body = result.data;

    next();
}