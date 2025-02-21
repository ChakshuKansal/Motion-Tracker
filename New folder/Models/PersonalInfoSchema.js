const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema(
  {
    height: { type: Number },
    weight: { type: Number },
    gender: { type: String, trim: true },
    address: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonalInfo", PersonalInfoSchema);
