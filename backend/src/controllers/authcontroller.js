
const { catchAsyncErrors } = require("../middleware/CatchAsyncError")
const User = require("../models/User.model")
const ErrorHandler = require("../utils/Errorhandler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { transporter } = require("../utils/Sendmail")
const GoogleStratgy = require("passport-google-oauth20").Strategy


const registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const isUserExists = await User.findOne({ email })
    if (isUserExists !== null) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const generatedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: generatedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure:true,
        httpOnly: true,
        sameSite: "none",
        path:"/"
    })
    res.status(201).json({
        success: true,
        token,
        message: "User created successfully",
        user
    })

})


const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure:true,
        httpOnly: true,
        sameSite:"none",
        path:"/"
    })
    res.status(201).json({
        success: true,
        token,
        message: "User logged in successfully",
        user
    })
})

const getCurrentUser = catchAsyncErrors(async(req, res)=>{
    const user = await User.findById(req.user.id)
    let enc =process.env.NODE_ENV === "production"
    console.log(enc)
    res.status(200).json({
        success: true,
        user
    })
} )

const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", "");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
})


const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new ErrorHandler("Please provide your email", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("No user found with this email", 404));


  const plainToken = `${user._id}-${Date.now()}`;


  const hashedToken = await bcrypt.hash(plainToken, 10);


  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });


 const resetUrl = `${process.env.CLIENT_URL}/reset-password/${encodeURIComponent(plainToken)}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset it.</p>`,
  });

  // Normally, send via email — for now, just return in response
  res.status(200).json({
    success: true,
    message: "Password reset link generated successfully",
    resetUrl,
    // email,
    // user
  });
});

// --- RESET PASSWORD ---
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) return next(new ErrorHandler("Please provide new password", 400));
  if (!token) return next(new ErrorHandler("Invalid or missing token", 400));

  const users = await User.find({ resetPasswordExpire: { $gt: Date.now() } });

  // Find matching token (bcrypt compare)
  const user = await Promise.all(
    users.map(async (u) => {
      const match = await bcrypt.compare(token, u.resetPasswordToken || "");
      return match ? u : null;
    })
  ).then((results) => results.find((u) => u !== null));

  if (!user)
    return next(new ErrorHandler("Invalid or expired password reset token", 400));

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful! You can now login with new password.",
  });
});

module.exports = { registerUser, login, logout,getCurrentUser,forgotPassword,resetPassword }