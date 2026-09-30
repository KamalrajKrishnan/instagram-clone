import mongoose from "mongoose";
import "dotenv/config";

const Dbconnect = async ()=>{
    try{
        await mongoose.connect(process.env.NODE_MONGODB_URL);
        console.log("MongoDB connected");
    }catch(e){
        console.error("MongoDB connection failed:", e);
    }
}
export default Dbconnect;
