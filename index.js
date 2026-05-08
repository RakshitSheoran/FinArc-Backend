require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const goalRoutes = require("./routes/goals");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Health check — pinged by UptimeRobot to prevent Render cold starts
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
