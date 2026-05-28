import mongoose from "mongoose";
import notesModel from "../models/notes.model.js";
import validateNotes from "../validators/notes.validater.js";
import ApiError from "../utils/ApiError.util.js";

// Funciton to create the notes 
async function createService(title, description, email) {

    // Validating the data
    validateNotes(title, description);

    // Adding the data in the Database
    const notes = await notesModel.create({ email, title, description });

    return notes;
}


// Function to get the notes 
async function getService(email) {

    // Finding notes of same email id 
    const notes = await notesModel.find({ email });

    // retunning the notes
    return notes;
}


// Function to update the notes 
async function updateService(id, title, description) {

    // Checking if the id is a true if or not
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Id not valid");

    // Validating the data
    validateNotes(title, description);

    let notes;

    // Checking if notes exists
    try {
        notes = await notesModel.findById(id);
    } catch (err) {
        throw new ApiError(409, "Notes not found");
    }

    // Updating the notes
    notes.title = title;
    notes.description = description;

    // saving it 
    await notes.save();

    return notes;

}

// function to delte the ntoes
async function deleteService(id) {

    // Checking if the id is a true if or not
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Id not valid");

    let notes;

    // Checking if notes exists
    try {
        notes = await notesModel.findByIdAndDelete(id);
    } catch (err) {
        throw new ApiError(409, "Notes not found");
    }

    return ;

}

export { createService, getService, updateService, deleteService };