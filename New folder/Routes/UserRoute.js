const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../Models/UserSchema");
const auth = require("../middleware/auth");


router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).send("Server error");
    }
    res.clearCookie("token"); // Clear token cookie
    res.sendStatus(200);
  });
});


router.get("/checkAuth", (req, res) => {
  if (req.session?.loggedIn) {
    console.log("User is authenticated");
    res.sendStatus(200);
  } else {
    console.log("User is not authenticated");
    res.sendStatus(401);
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body; // "username" should be "emailId" if that's how it's stored

  try {
    const user = await User.findOne({ emailId: username });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

 
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "5d" });

    res.status(200).json({ token, userId: user.id });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("Server error");
  }
});


router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ emailId: email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    user = new User({
      firstName: username,
      emailId: email,
      password: hashedPassword
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "5d" });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/dashboard.html", auth, (req, res) => {
  res.sendFile("dashboard.html", { root: __dirname + "/dist" });
});

router.get("/activity.html", auth, (req, res) => {
  res.sendFile("activity.html", { root: __dirname + "/dist" });
});

module.exports = router;
