import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Starting app...");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("❌ MONGO_URI is missing");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    process.exit(0); // exit so you SEE the message
  })
  .catch((err) => {
    console.log("❌ Connection failed:", err.message);
    process.exit(1);
  });