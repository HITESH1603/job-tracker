import { Request,Response } from "express";
import { getApplicationsService , getApplicationByIDService} from "../services/application.service";


export async function  getApplications (req:Request,res:Response) {
     
    if(req.userId === undefined){
        return res.status(401).json({
            message:"Unauthorized "
        })
    }
    const result = await getApplicationsService(req.userId)

       
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
       
    if(req.userId === undefined){
      return  res.status(401).json({
            message:"UnAuthorized"
        })
    }
    const  application = await getApplicationByIDService(applicationID,req.userId);

     if(!application){
        return res.status(404).json({
            message : "Application not found"
        })
     }

     
    res.json(application)
}