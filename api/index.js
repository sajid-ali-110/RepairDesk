require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("../server/config/dbconfig");

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
app.use("/api/auth", require("../server/routes/auth"));
app.get("/api", (req, res) => {
    res.json({ message: "API is running..." });
});
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

// Export for Vercel serverless
module.exports = app;
