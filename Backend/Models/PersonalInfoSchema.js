const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  gender: String,
  address: String,
}, { timestamps: true });

module.exports = PersonalInfoSchema;