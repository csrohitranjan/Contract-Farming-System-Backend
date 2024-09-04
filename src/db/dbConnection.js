import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DATABASE CONNECTED !!!")
    } catch (error) {
        console.log("Database Cnnection Failed", error)
        process.exit(1);
    }
}


export default connectDB;