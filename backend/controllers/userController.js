const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");

// This controller handles the signup and signin logic.
// It keeps the route file simple and organizes the API behavior clearly.

async function signup(req, res) {
  try {
    const { email, password, role } = req.body;

    // Validate the incoming form data before doing anything with the database.
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, password, and role.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message:
          "Database connection is unavailable. Please start MongoDB and try again.",
      });
    }

    // Check whether a user with this email already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please sign in instead.",
      });
    }

    // Hash the password before saving it. This is the key security step.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please sign in.",
      data: {
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    if (
      error.name === "MongooseServerSelectionError" ||
      error.name === "MongoServerSelectionError"
    ) {
      return res.status(503).json({
        success: false,
        message:
          "Database connection is unavailable. Please start MongoDB and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating your account.",
    });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message:
          "Database connection is unavailable. Please start MongoDB and try again.",
      });
    }

    // Find the user by email.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email or sign up.",
      });
    }

    // Compare the password typed by the user with the stored hash.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sign in successful.",
      data: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin error:", error.message);

    if (
      error.name === "MongooseServerSelectionError" ||
      error.name === "MongoServerSelectionError"
    ) {
      return res.status(503).json({
        success: false,
        message:
          "Database connection is unavailable. Please start MongoDB and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while signing you in.",
    });
  }
}

module.exports = {
  signup,
  signin,
};
