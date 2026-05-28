// Importing modules 
import express from "express";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import { signup } from "../controllers/auth.controller.js";

// Initializing the auth router
const authRouter = express.Router();

// Post route for the signup
authRouter.post("/signup", asyncWrapper(signup));

export default authRouter;