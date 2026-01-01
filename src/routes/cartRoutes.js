const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// View cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/add", protect, addToCart);

// Remove product from cart
router.delete("/remove/:productId", protect, removeFromCart);

// Clear cart
router.delete("/clear", protect, clearCart);

module.exports = router;
