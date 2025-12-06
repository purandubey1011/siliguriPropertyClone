const express = require("express");
const morgan= require("morgan");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const ErrorHandler = require('./utils/Errorhandler.js');
const { generatedErrors } = require('./middleware/Error.js');
const passport = require("passport");
const jwt = require("jsonwebtoken")
require("./config/passport.js")(passport)
const app = express()   

app.use(cookieParser())

app.use(cors({
    origin:[`${process.env.CLIENT_URL}`,"https://siliguri-properties.vercel.app","http://localhost:5173","http://localhost:5174"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}))

 
app.use(express.json());
app.use(morgan("tiny"))
app.use(express.urlencoded({extended: false}))

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.route(`/auth/google`).get(passport.authenticate("google",{scope: ["email", "profile"]}))
app.route("/auth/google/callback").get(passport.authenticate("google",{session:false}),(req,res)=>{
const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET)
res.cookie("token", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // secure:true,
    // httpOnly: true,
    // sameSite:"none",
    // path:"/"
})

// res.status(201).json({
//     success: true,
//     token,
//     message: "User logged in successfully",
//     user: req.user
// })
res.redirect(`${process.env.CLIENT_URL}/google`)
})
app.get("/", (req, res) => {
    console.log("App is running");
    res.send("App is running")
})

app.route("/auth/facebook").get(passport.authenticate("facebook",{scope: [ "public_profile"], state:"somerandomstring" }))
app.route(`/auth/facebook/callback`).get(passport.authenticate("facebook",{session:false}),(req,res)=>{
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        // secure:true,
        // httpOnly: true,
        // sameSite:"none",
        // path:"/"
    })
    // res.send({
    //     success: true,
    //     token,
    //     message: "User logged in successfully",
    //     user: req.user
    // })
   
    res.redirect(`${process.env.CLIENT_URL}/facebook`)
    })


app.use("/api/v1/auth", require("./routes/auth.Routes.js"))
app.use("/api/v1/property", require("./routes/property.Routes.js"))





app.use(/(.*)/, (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});
app.use(generatedErrors)

module.exports= app