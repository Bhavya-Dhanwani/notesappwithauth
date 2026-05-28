import { createService } from "../services/notes.service.js";
import ApiError from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";

/*
@access Private - to logged in users
@Use to create notes
@type POST
*/
async function createNotes(req, res) {

    // accepting the data
    let { title, description } = req.body;

    // Authorizeing the user.
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // setting the notes 
    const notes = await createService( title, description, req.user.email);

    // Sending the response back
    ApiResponse(res, 201, "Notes created Successfully", notes);
}


export { createNotes };