// importing express
import express from "express";
import authRouter from "./atuh.router.js";
import notesRouter from "./notes.router.js";

// Making a router
const mainRouter = express.Router();

// Congifuring the branch routes
mainRouter.use("/auth", authRouter);
mainRouter.use("/notes", notesRouter);

export default mainRouter;