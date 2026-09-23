import { Request, Response, NextFunction } from "express";
import { applicationQuerySchema } from "../validation/applicationQuery.schema";
import {z} from "zod";

export function validateApplicationQuery(req:Request, res:Response, next:NextFunction){
    const result = applicationQuerySchema.safeParse(req.query);

    if(!result.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: z.flattenError(result.error).fieldErrors
        });
    }

    req.validatedQuery = result.data ;

    next();
}