const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    usertype: {
        type:String,
        default:"user"
    },
    properties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
        },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);