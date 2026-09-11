import express from "express";
import applicationRouter from "./routes/applications.routes";

const app = express();

app.get("/",(req,res)=>{
    res.json({message: "Server is running"})
})

app.use("/applications",applicationRouter)

export default app