const express = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my", protect, getMyOrders);

module.exports = router;
