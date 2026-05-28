import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose, { mongo } from "mongoose";

// User Schema for adding a user
const userSchema = new mongoose.Schema({
    name: String,
    email: Stirng,
    password: String
});


// Pre functions to haspassword on save
userSchema.pre("save", function() {

    // Checking the password is hashed or not
    if (this.modified("password")) return;

    // Hashing the password
    this.password = bcrypt.hashSync(this.password, 10);
});


// A method to generate a JWT token
userSchema.methods.generateJwt = function() {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET)
}

// A method to compare Password
userSchema.methods.comparePassowrd = function(password) {
    if (bcrypt.compareSync(password, this.password)) return true;
    else return false;
}

// Making the user model
const userModel = await new mongoose.model("users", userSchema);

export default userModel;