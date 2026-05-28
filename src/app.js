// Importing modules
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

// Configuring the env
config();

// initializing app
const app = express();

// adding Middlewares 
app.use(express.json());
app.use(cookieParser());

export default app;