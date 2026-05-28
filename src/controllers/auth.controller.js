import { signupService } from "../services/auth.service.js";
import ApiError from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import sanitize from "../utils/sanitize.util.js";

/*
@Router signup 
@Access Public
@Use - To create new user
*/
async function signup(req, res) {

    // accepting inputs 
    let { name, email, password } = req.body;

    // Authenticating the user
    const { jwt, user } = await signupService(name, email, password);

    // setting the cookie 
    res.cookie("token", jwt, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // sanitizing the user to prevent password to be sent
    const sanitizedUser = sanitize(user);

    // Sending the response
    return ApiResponse(res, 201, "user Created Successfully", sanitizedUser);
}

export { signup };