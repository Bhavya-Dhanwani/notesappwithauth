import { createService, getService, updateService } from "../services/notes.service.js";
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

/*
@access Private - to logged in users
@Use to get notes
@type POST
*/
async function getNotes(req, res) {

    // Checking for user 
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // get the notes form service 
    const notes = await getService(req.user.email);

    ApiResponse(res, 200, "Notes fetched successfully", notes);
}

/*
@access Private - to logged in users
@Use to update
@type PATCH
*/

async function updateNotes(req, res) {
    
    // accepting the data 
    let id = req.params.id;
    let { title, description } = req.body;

    // Checking for user 
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // update the notes
    const notes = await updateService(id, title, description);

    ApiResponse(res, 200, "Notes updated Successfully", notes);
}

export { createNotes, getNotes, updateNotes };