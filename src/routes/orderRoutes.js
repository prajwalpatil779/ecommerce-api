const express = require("express");
const router = express.Router();

const {
  getMyOrders,
  createOrder
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

/**
 * @route   GET /api/orders/my
 * @desc    Get logged-in user's orders
 * @access  Private
 */
router.get("/my", protect, getMyOrders);

/**
 * @route   POST /api/orders
 * @desc    Create order
 * @access  Private
 */
router.post("/", protect, createOrder);

module.exports = router;
