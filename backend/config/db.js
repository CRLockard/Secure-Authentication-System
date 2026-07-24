const mongoose = require("mongoose");

// This function creates the connection to MongoDB.
async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing. Please add MONGODB_URI or MONGO_URI to your .env file.",
      );
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully.");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
}

module.exports = connectToDatabase;
