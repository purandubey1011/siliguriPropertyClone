const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
   mobile: {
       type: Number,
   }
},{timestamps: true});

module.exports = mongoose.model("Owner", ownerSchema);        