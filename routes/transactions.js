const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/transactions — all transactions for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/transactions — create new transaction
router.post("/", auth, async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    if (!description || !amount || !category || !type || !date)
      return res.status(400).json({ message: "All fields are required" });

    const transaction = await Transaction.create({
      userId: req.userId,
      description,
      amount: Number(amount),
      category,
      type,
      date: new Date(date),
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/transactions/:id — update transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount: Number(amount), category, type, date: new Date(date) },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/transactions/:id — delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
