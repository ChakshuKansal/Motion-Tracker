const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");

    // Handle connection events
    mongoose.connection.on("error", (err) => console.error("❌ MongoDB Error:", err));
    mongoose.connection.on("disconnected", () => console.log("🔌 MongoDB Disconnected."));
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
};

// Close MongoDB connection
const closeDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected...");
  } catch (err) {
    console.error("❌ Error closing MongoDB:", err.message);
  }
};

// Handle app termination gracefully
process.on("SIGINT", async () => {
  await closeDB();
  console.log("⚠️ Process terminated. Closing MongoDB connection.");
  process.exit(0);
});

module.exports = { connectDB, closeDB };
