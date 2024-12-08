import express from "express";
import dotenv from "dotenv"
const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("hi");
})

app.listen(PORT,()=>{
    console.log("Sever started at port" ,PORT)
})