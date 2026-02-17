import mongoose from "mongoose";

const dbConnection=async ()=>{
    try {
        const uri=await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
    }
    catch (err){
        console.log("db connection failed" ,err.message)
    }
}
export default dbConnection;