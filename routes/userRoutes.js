const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("../middleware/jwt");

// Sign-up Route
router.post("/signup", async (req, res) => {
  try {
    const { role } = req.body;

    // Check if the role is 'admin'
    if (role === "admin") {
      // Check if an admin already exists
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(403).json({
          error: "An admin already exists. Only one admin is allowed.",
        });
      }
    }

    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("User data saved");

    // Generate token for the new user
    const payload = { id: response.id };
    const token = generateToken(payload);

    res.status(201).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { aadharCardNumber, password } = req.body;

    // Find the user by Aadhar card number
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // Validate user existence and password
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid Aadhar card number or password" });
    }

    // Generate token for the logged-in user
    const payload = { id: user.id };
    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route to get user profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update user password
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("Password updated");
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
