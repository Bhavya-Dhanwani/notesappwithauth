import notesModel from "../models/notes.model.js";
import validateNotes from "../validators/notes.validater.js";

async function createService(title, description, email) {

    // Validating the data
    validateNotes(title, description);

    // Adding the data in the Database
    const notes = await notesModel.create({ email, title, description });

    return notes;
}

export { createService };