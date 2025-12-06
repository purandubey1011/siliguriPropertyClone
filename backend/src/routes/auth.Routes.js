const express = require("express")
const { registerUser, login, logout, getCurrentUser,forgotPassword,resetPassword, updateProfile } = require("../controllers/authcontroller")
const passport = require("passport")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { IsUserLoggedIn } = require("../middleware/IsUserLogedIn")
const upload = require("../config/multer")
 
require("../config/passport")(passport)


router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/getcurrentuser").get(IsUserLoggedIn,getCurrentUser)
router.route("/update-profile").put(IsUserLoggedIn, upload.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]) ,updateProfile)


router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

module.exports = router
