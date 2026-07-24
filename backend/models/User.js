const mongoose = require("mongoose");

// The User model stores the information we need for authentication.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
