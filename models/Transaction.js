const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Entertainment", "Utilities", "Health", "Rent", "Salary", "Freelance", "Other"],
  },
  type: { type: String, required: true, enum: ["income", "expense"] },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
