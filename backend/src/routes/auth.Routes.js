const express = require("express")
const { registerUser, login, logout, getCurrentUser,forgotPassword,resetPassword } = require("../controllers/authcontroller")
const passport = require("passport")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { IsUserLoggedIn } = require("../middleware/IsUserLogedIn")
 
require("../config/passport")(passport)


router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/getcurrentuser").get(IsUserLoggedIn,getCurrentUser)

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

module.exports = router
