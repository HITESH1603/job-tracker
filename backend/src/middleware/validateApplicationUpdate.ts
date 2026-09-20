import { Request, Response, NextFunction } from "express";
import { updateApplicationSchema } from "../validation/application.schema";
import {z} from "zod";

export function validateApplicationUpdate (req:Request, res:Response, next:NextFunction){

    const result = updateApplicationSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: z.flattenError(result.error).fieldErrors
        });
    }

    if(Object.keys(result.data).length === 0){
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

      req.body = result.data;

      next();
}