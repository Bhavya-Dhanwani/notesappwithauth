import ApiError from "../utils/ApiError.util.js";

function validateNotes(title, description) {
    
    // validating the data
    if(!title) {
        throw new ApiError(400, "Title is required");
    }

    if(!description) {
        throw new ApiError(400, "Description is required");
    }

    if(title.trim().length < 4) {
        throw new ApiError(400, "Title must be atleast 4 characters long.");
    }

    if(description.trim().length < 10) {
        throw new ApiError(400, "description must be atleast 10 characters long.");
    }
}

export default validateNotes;