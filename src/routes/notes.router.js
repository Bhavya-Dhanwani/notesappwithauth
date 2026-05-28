import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import { createNotes, getNotes } from "../controllers/notes.controller.js";

// cretaed a router
const notesRouter = express.Router();

//added the create route with a middleware
notesRouter.post("/", authMiddleware, asyncWrapper(createNotes));
notesRouter.get("/", authMiddleware, asyncWrapper(getNotes));

export default notesRouter;