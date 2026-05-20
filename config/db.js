import mongoose, { mongo } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connect() {
    try {
        const CONNECTION = await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected...");
        return CONNECTION
    } catch (err) {
        console.log("Connection failed:", err.message);
    }
    
}

export {connect}    