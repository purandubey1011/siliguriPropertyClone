exports.generatedErrors = async (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    // Normalize duplicate key errors from Mongo/Mongoose
    if (
        err?.code === 11000 ||
        (err?.name === "MongoServerError" && err?.message?.includes("E11000"))
    ) {
        statusCode = 400;
        err.message = "User with this email or contact already exists";
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
        errorName: err.name,
        stack: err.stack,
    });
}