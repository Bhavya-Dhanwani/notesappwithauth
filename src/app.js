// Importing modules
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import mainRouter from "./routes/mainRouter.route.js";
import connectDB from "./config/db.config.js";

// Configuring the env
config();

// initializing app
const app = express();

// adding Middlewares 
app.use(express.json());
app.use(cookieParser());

// Connecting the DB
await connectDB();

// Configuring the Main router
app.use("/api", mainRouter);

export default app;