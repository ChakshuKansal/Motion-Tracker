const express = require("express");
const session = require("express-session");
const cors = require("cors");
const conn = require("./config/db"); // Database connection
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Connect to Database
conn.connectDB();

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Routes
app.get("/", (req, res) => res.send("🚀 API Running"));

// API Test Route (Ensure the database function is correctly implemented)
app.get("/test_api", async (req, res) => {
  try {
    const users = await conn.getUsers(); // Ensure this function exists in db.js
    res.status(200).json(users);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route Imports
app.use("/api", require("./Routes/userRoutes"));
app.use("/exercise", require("./Routes/ExerciseRoute"));
app.use("/email", require("./Routes/EmailRoute"));

// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
