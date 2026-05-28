import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    // Getting the tokens from the cookies
    const token = req.cookies.token;

    if (!token) return next();

    // getting the data from the token 
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // seeting the user in the req to send forward
    req.user = user;
    next()
}

export default authMiddleware;