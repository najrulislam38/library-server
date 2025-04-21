const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect...", error));

//   middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
