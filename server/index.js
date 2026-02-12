require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/dbconfig");

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware to check DB connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      msg: "Database not connected. Please check your database credentials in .env",
    });
  }
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Export for Vercel
module.exports = app;

// Listen only in local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
