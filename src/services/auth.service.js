import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";
import { loginValidator, signupValidator } from "../validators/auth.validater.js";

// Signup service to add the user 
async function signupService(name, email, password) {

    // validating the data
    signupValidator(name, email, password);

    // adding the data in the datbase
    const user = await userModel.create({ name, email, password });

    // generating the JWT
    const jwt = user.generateJwt();

    return { jwt, user };
}

async function loginService(email, password) {

    // Validating the data
    loginValidator(email, password);

    // Finding the user
    let user;

    try {
        user = await userModel.findOne({ email });
    } catch (err) {
        throw new ApiError(409, "User not found");
    }

    if (!user.comparePassowrd(password)) {
        throw new ApiError(401, "User unauthorized.")
    }

    // generating the jwt
    const jwt = user.generateJwt();

    return { jwt, user };
}

export { signupService, loginService }