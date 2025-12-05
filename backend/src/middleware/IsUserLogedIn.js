const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/Errorhandler');

// no need to wrap in catchAsyncErrors, since we handle try/catch here
const IsUserLoggedIn = (req, res, next) => {
    // 1️⃣ Get token from cookies or headers
    const token =
        req.cookies?.token 
    // 2️⃣ If no token
    if (!token) {
        return next(new ErrorHandler("Not authorized to access this route", 401));
    }

    try {
        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // 4️⃣ Attach user info from token payload to req
        req.user = decoded;
        next();
    } catch (err) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};

module.exports = {IsUserLoggedIn};
