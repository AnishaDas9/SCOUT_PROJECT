import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const URI  = process.env.MONGO_URI;

const connectionDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection established successfully");
    } catch (error) {
        console.error("database connection failed.....");
        
    }
}

export default connectionDb;