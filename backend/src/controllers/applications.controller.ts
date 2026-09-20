import { Request,Response } from "express";
import { getApplicationsService, getApplicationByIDService, createApplicationService, updateApplicationService} from "../services/application.service";


export async function  getApplications (req:Request,res:Response) {
     
    if(req.userId === undefined){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    const result = await getApplicationsService(req.userId);

       
         res.json(result);
}


export async function getApplicationByID (req:Request,res:Response){

    const {id} = req.params;

    const applicationID = Number(id);

    if(!Number.isInteger(applicationID)|| applicationID <= 0){

        return res.status(400).json({
          message : "Invalid ID"
        });
    }
       
    if(req.userId === undefined){
      return  res.status(401).json({
            message:"Unauthorized"
        });
    }
    const  application = await getApplicationByIDService(applicationID,req.userId);

     if(!application){
        return res.status(404).json({
            message : "Application not found"
        });
     }

     
    res.json(application);
}





export async function createApplication (req:Request ,res:Response) {
            
    if(req.userId === undefined){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const {company ,role ,status ,location ,job_url ,date_applied ,notes} = req.body;

    const application = await createApplicationService(req.userId ,company ,role ,status ,location, job_url ,date_applied,notes);

    res.status(201).json(application);
}


export async function updateApplication(req:Request, res:Response){
     
     const {id} = req.params;
     const applicationId = Number(id);

     if(!Number.isInteger(applicationId) || applicationId <= 0){
        return res.status(400).json({
            message: "Invalid ID"
        });
     }

      if(req.userId === undefined){
        return res.status(401).json({
            message: "Unauthorized"
        });
      }

      const application = await updateApplicationService(applicationId, req.userId, req.body);

      if(!application){
        return res.status(404).json({
            message: "Application not found"
        });
      }


      res.json(application);
}