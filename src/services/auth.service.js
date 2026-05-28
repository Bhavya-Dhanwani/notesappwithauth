import userModel from "../models/user.model.js";
import { signupValidator } from "../utils/validation.util.js";

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

export { signupService }