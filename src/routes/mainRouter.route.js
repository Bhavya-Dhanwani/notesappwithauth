// importing express
import express from "express";
import authRouter from "./atuh.router.js";

// Making a router
const mainRouter = express.Router();

// Congifuring the branch routes
mainRouter.use("/auth", authRouter);

export default mainRouter;