const mongoose = require('mongoose');

// Assuming you've defined personalInfoSchema somewhere else
const personalInfoSchema = require('../Models/PersonalInfoSchema');

const workoutSchema = new mongoose.Schema({
  nameWorkout: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  repetition: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  dateofbirth: {
    type: Date
  },
  nickname: {
    type: String
  },
  workouts: [workoutSchema],
  date: {
    type: Date,
    default: Date.now
  },
  personalInfo: [personalInfoSchema] // Embedded personal info schema
});

// Export the model
module.exports = mongoose.model('exerciseuser', UserSchema);
