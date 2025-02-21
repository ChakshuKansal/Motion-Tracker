const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Exercise = require("../models/ExerciseSchema");
const User = require("../models/UserSchema");
const auth = require("../middleware/auth");

// Fetch All Exercises for a User
router.get("/getAllExercises", auth, async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const user = mongoose.Types.ObjectId.isValid(userId)
      ? await User.findById(userId)
      : await User.findOne({ email: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch an Activity by ID
router.get("/getactivitybyid/:exid", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exid);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    res.json(exercise);
  } catch (error) {
    console.error("Error fetching exercise:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a New Workout Score to a User
router.post("/scores", auth, async (req, res) => {
  try {
    const { newScore } = req.body;
    if (!newScore) return res.status(400).json({ message: "Invalid score data" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.workouts.push(newScore);
    await user.save();

    res.json({ message: "Workout added successfully", workouts: user.workouts });
  } catch (error) {
    console.error("Error adding workout:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch All Activities (Exercises)
router.get("/getallactivities", async (req, res) => {
  try {
    const activities = await Exercise.find();
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a New Activity
router.post("/addactivity", auth, async (req, res) => {
  try {
    const { exerciseName, exerciseType } = req.body;
    if (!exerciseName || !exerciseType)
      return res.status(400).json({ message: "Exercise name and type are required" });

    await new Exercise({ exerciseName, exerciseType }).save();
    res.status(201).json({ message: "New activity added successfully" });
  } catch (error) {
    console.error("Error adding activity:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
