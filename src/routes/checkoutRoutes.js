const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/checkoutController");
const protect = require("../middleware/authMiddleware");

/**
 * @route   POST /api/checkout
 * @desc    Checkout
 * @access  Private
 */
router.post("/", protect, checkout);

module.exports = router;
