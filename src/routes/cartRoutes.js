const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

// Get cart
router.get("/", protect, getCart);

// Add to cart
router.post("/add", protect, addToCart);

// Remove from cart
router.delete("/remove/:id", protect, removeFromCart);

// Clear cart
router.delete("/clear", protect, clearCart);

module.exports = router;
