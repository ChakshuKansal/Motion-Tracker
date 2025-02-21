const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema(
  {
    exerciseType: { type: String, required: true, trim: true },
    exerciseName: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
