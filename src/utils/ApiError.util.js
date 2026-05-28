class ApiError extends Error {
    constructor(statusCode, messgae) {
        super(message);

        this.statusCode = statusCode;
        this.message = this.message;
    }
}

export default ApiError;