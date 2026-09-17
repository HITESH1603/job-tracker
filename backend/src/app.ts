import express from "express";
import applicationRouter from "./routes/applications.routes";
import authRouter from "./routes/auth.routes";
import { Request , Response , NextFunction } from "express";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "Server is running"})
})


app.use("/applications",applicationRouter)
app.use("/auth",authRouter)


app.use((error:unknown, req:Request, res:Response, next:NextFunction)=>{
     if( typeof error === "object" && error !== null && "code" in error && error.code === "23505" && 
        "constraint" in error && error.constraint === "users_email_key") {
              return res.status(409).json({
                message: "Email already exists"
              })
     }  

     console.error(error)

     return res.status(500).json({
        message: "Something went wrong"
     })
})
export default app