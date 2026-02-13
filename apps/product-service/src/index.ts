import express from "express" ;
import cors from "cors" ;
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/auth.middleware.js";

const app = express()
const PORT = 8000

app.use(cors({
    origin:["http://localhost:3002","http://localhost:3003"],
    credentials:true
}))
app.use(clerkMiddleware())

app.get("/test",shouldBeUser, async (req,res)=>{
    return res.status(200).json({message:'Product service authenticated',userId:req.userId})
})

app.listen(PORT,()=>{
    console.log(`Product service listening on port ${PORT}`)
})