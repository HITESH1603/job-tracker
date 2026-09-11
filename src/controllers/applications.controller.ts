import { Request,Response } from "express";
import { getApplicationsService } from "../services/application.service";
export  const  getApplications =(req:Request,res:Response) =>{
    const result = getApplicationsService()
         res.json(result)
}