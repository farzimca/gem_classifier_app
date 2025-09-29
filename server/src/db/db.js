import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbconnect() {
  if (cached.conn) {
    // Reuse existing connection in Vercel or Express
    console.log("=> using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;

    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // fail fast if DB isn't reachable
      bufferCommands: false,          // better for serverless
    })
    .then((mongoose) => {
      console.log("=> new database connection created");
      return mongoose;
    })
    .catch((err) => {
      console.error("❌ Error in DB Connection:", err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbconnect;
