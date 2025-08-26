import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';


dotenv.config();

const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import router from "./routes/authRoutes.js";
import predictionRouter from "./routes/prediction.routes.js";
import favoriteRouter from "./routes/favorite.routes.js"

app.use('/api/v1/users', router)

app.use("/api/v1/predictions", predictionRouter);

app.use("/api/v1/favorites", favoriteRouter);

export default app;
