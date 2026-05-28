import ApiError from "../utils/ApiError.util.js";

// Funciton to validate the sign up inputs
function signupValidator(name, email, password) {

    // Validating the data receiced
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    if (!email) {
        throw new ApiError(400, "Email is requires");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // added regex to test email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Email is not valid");
    }
}

function loginValidator(email, password) {

    // Validating the data receiced
    if (!email) {
        throw new ApiError(400, "Email is requires");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // added regex to test email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Email is not valid");
    }
}

export { signupValidator, loginValidator };