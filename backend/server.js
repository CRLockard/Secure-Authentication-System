const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import the database connection helper and the route file.
const connectToDatabase = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Load environment variables from the .env file.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// This lets the React frontend talk to the backend during development.
app.use(cors({ origin: "http://localhost:5173" }));

// This allows Express to read JSON data from incoming requests.
app.use(express.json());

// A simple health check route so we can confirm the API is running.
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Authentication server is running.",
  });
});

// All authentication endpoints will be handled by the user routes.
app.use("/", userRoutes);

// Connect to MongoDB before starting the server.
// If MongoDB is not available, the server will still start so the API can return a clearer message.
connectToDatabase().then((connected) => {
  if (!connected) {
    console.log("Server is running, but MongoDB is currently unavailable.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
