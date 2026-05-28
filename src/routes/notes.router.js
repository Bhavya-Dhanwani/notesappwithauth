import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controllers/notes.controller.js";

// cretaed a router
const notesRouter = express.Router();

//added the create route with a middleware
notesRouter.post("/", authMiddleware, asyncWrapper(createNotes));
notesRouter.get("/", authMiddleware, asyncWrapper(getNotes));
notesRouter.patch("/:id", authMiddleware, asyncWrapper(updateNotes));
notesRouter.delete("/:id", authMiddleware, asyncWrapper(deleteNotes));

export default notesRouter;