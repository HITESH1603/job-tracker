import { Request,Response } from "express";
import { getApplicationsService , getApplicationByIDService} from "../services/application.service";


export async function  getApplications (req:Request,res:Response) {
    const result = await getApplicationsService()
         res.json(result)
}


export async function getApplicationByID (req:Request,res:Response){

    const {id} = req.params
    const applicationID = Number(id)
    if(!Number.isInteger(applicationID)|| applicationID<=0){
        return res.status(400).json({
          message : "Invalid ID"
        })
    }

    const  application = await getApplicationByIDService(applicationID);

     if(!application){
        return res.status(404).json({
            message : "Application not found"
        })
     }

    res.json(application)
}