import mongoose from "mongoose"

let isConnected:boolean = false

export const connectOrderDb = async ()=>{
    if(isConnected) return;
    if(!process.env.MONGO_URL){
        throw new Error("Mongo url is not defined in env file")
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true
    } catch (error:any) {
        console.log(error.message)
    }
}