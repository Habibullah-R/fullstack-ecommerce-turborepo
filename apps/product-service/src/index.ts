import express, { Request, Response, NextFunction } from "express" ;
import cors from "cors" ;
import { clerkMiddleware } from '@clerk/express'
import { shouldBeUser } from "./middleware/auth.middleware";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route"

const app = express()
const PORT = 8000

app.use(cors({
    origin:["http://localhost:3002","http://localhost:3003"],
    credentials:true
}))
app.use(express.json())
app.use(clerkMiddleware())

app.get("/test",shouldBeUser, async (req,res)=>{
    return res.status(200).json({message:'Product service authenticated',userId:req.userId})
})

app.get("/",()=>{
    console.log("hello")
})

app.use("/product",productRouter)
app.use("/category",categoryRouter)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    return res.status(err.status || 500).json({
        message:err.message || "Internal server error"
    })
})

app.listen(PORT,()=>{
    console.log(`Product service listening on port ${PORT}`)
})