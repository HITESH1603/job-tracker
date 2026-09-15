import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not configured")
}

const jwtSecret:string = JWT_SECRET;




interface AuthTokenPayload{
    userId : number;
}

export function authMiddleware(req:Request,res:Response,next:NextFunction){

    const authorization = req.headers.authorization;

    if(!authorization){
       return res.status(401).json({
          message : "Authorization Header is missing"
       });
    }



const parts = authorization.split(" ")

if((parts[0] !=='Bearer'|| !parts[1])){
   return  res.status(401).json({
        message : "Invalid Authorization Header"
    })
}


const token = parts[1]

try {
   const decoded = jwt.verify(token,jwtSecret)

   if( typeof decoded === "string" || typeof decoded.userId !== "number"){
    return res.status(401).json ({
         message:"Invalid token payload"
      })
   }

    const payload = decoded as AuthTokenPayload;

   req.userId = payload.userId;

   next()
   
} catch {
     return res.status(401).json({
        message : "Invalid or Expired token"
     })
}
}

