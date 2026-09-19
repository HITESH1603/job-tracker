import { Request, Response, NextFunction } from "express";
import { applicationSchema } from "../validation/application.schema";
import {z} from "zod";

export function validateApplication (req:Request, res:Response, next:NextFunction){

    const result = applicationSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: z.flattenError(result.error).fieldErrors
        });
    }

    req.body = result.data;

    next()
}