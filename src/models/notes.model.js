import mongoose from "mongoose";

// Making the notes Schema to store notes
const notesSchema = new mongoose.Schema({
    email: String,
    title: String,
    description: String
});

// Making model for the notes
const notesModel = await new mongoose.model("notes", notesSchema);

export default notesModel;