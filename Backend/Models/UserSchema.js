const mongoose = require("mongoose");
const personalInfoSchema = require("../Models/PersonalInfoSchema");

const workoutSchema = new mongoose.Schema({
  nameWorkout: { type: String, required: true },
  duration: { type: String, required: true },
  repetition: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    mobile: String,
    dateOfBirth: Date,
    nickname: String,
    workouts: [workoutSchema],
    date: { type: Date, default: Date.now },
    personalInfo: [personalInfoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExerciseUser", UserSchema);
