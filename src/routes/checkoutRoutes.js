const express = require("express");
const { checkout } = require("../controllers/checkoutController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Checkout (User)
router.post("/", protect, checkout);

module.exports = router;
