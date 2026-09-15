import { Request,Response } from "express";
import { getApplicationsService } from "../services/application.service";

export async function  getApplications (req:Request,res:Response) {
    const result = await getApplicationsService()
         res.json(result)
}