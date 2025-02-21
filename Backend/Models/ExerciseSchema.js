const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  exerciseType: { type: String, required: true },
  exerciseName: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Exercise", ExerciseSchema);
