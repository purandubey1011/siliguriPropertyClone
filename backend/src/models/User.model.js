const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },

    firstName: { type: String },
    lastName: { type: String },

    email: { type: String, unique: true },

    password: { type: String },

    googleId: { type: String },
    facebookId: { type: String },

    avatar: { type: String },         // old field (optional)
    profileImage: { type: String },   // new profile image
    coverImage: { type: String },     // new cover image

    phoneNumber: { type: String },
    whatsappNumber: { type: String },

    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },

    bio: { type: String },

    usertype: {
      type: String,
      default: "user",
    },

    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
