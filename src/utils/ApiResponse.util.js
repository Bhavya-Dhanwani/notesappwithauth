function ApiResponse(res, status, message, data = null) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

export default ApiResponse;