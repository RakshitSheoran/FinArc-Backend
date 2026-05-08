const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/goals — return user's monthly goal
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("monthlyGoal");
    res.json({ monthlyGoal: user.monthlyGoal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/goals — update user's monthly goal
router.put("/", auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount))
      return res.status(400).json({ message: "Valid amount required" });

    await User.findByIdAndUpdate(req.userId, { monthlyGoal: Number(amount) });
    res.json({ monthlyGoal: Number(amount) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
