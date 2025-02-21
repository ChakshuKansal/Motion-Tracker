const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    nameWorkout: String,
    duration: String,
    repetition: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
