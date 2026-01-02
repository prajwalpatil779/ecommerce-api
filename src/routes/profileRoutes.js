const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

/**
 * @route   GET /api/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get("/", protect, getProfile);

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put("/", protect, updateProfile);

module.exports = router;
