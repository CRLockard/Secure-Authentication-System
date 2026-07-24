const express = require("express");
const { signup, signin } = require("../controllers/userController");

// This router groups the authentication endpoints together.
const router = express.Router();

// POST /signup creates a new user account.
router.post("/signup", signup);

// POST /signin checks the user's email and password.
router.post("/signin", signin);

module.exports = router;
