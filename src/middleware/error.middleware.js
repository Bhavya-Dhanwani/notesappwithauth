
// Made the error middle ware to handle global errors
function errorMiddleware(err, req, res, next) {
    res.status(err.StatusCode || 500).json({
        message: err.message || "Internal Server Error",
        success: false
    });
}

export default errorMiddleware;