import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import dbconnect from "../db/db.js"; // Ensure this path is correct relative to api/index.js

// Load environment variables from a .env file for local development
dotenv.config();

// Initialize the Express application
const app = express();

// --- Database Connection ---
// This block connects to your MongoDB instance.
// In a serverless environment, this code runs each time a new instance is created to handle requests.
// Vercel may keep instances warm, so the connection can be reused across multiple requests.
dbconnect()
  .then(() => {
    console.log("MongoDB connection established successfully.");
  })
  .catch((err) => {
    console.error(`FATAL: MongoDB connection error: ${err}`);
    // If the database connection fails, the application cannot function.
    // We can add middleware to respond with an error for all incoming requests.
    app.use((req, res, next) => {
      res.status(503).json({ 
        success: false, 
        message: "Service Unavailable: Could not connect to the database." 
      });
    });
  });

// --- Core Middleware ---
// CORS configuration to allow requests from your frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Middleware to parse incoming JSON payloads (e.g., from API requests)
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the "public" directory
// Note: For Vercel, it's often better to configure static assets in vercel.json, but this works too.
app.use(express.static("public"));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());


// --- API Routes ---
// Import your route handlers
import router from "../routes/authRoutes.js";
import predictionRouter from "../routes/prediction.routes.js";
import favoriteRouter from "../routes/favorite.routes.js";

// Mount the routers to their respective API endpoints
app.use('/api/v1/users', router);
app.use("/api/v1/predictions", predictionRouter);
app.use("/api/v1/favorites", favoriteRouter);

// A simple root route to confirm the server is running
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API! Everything is running."
  });
});


// --- Vercel Export ---
// IMPORTANT: Do NOT use app.listen(). 
// Vercel handles the server listening process.
// We export the configured 'app' instance for Vercel to use as a serverless function.
export default app;

