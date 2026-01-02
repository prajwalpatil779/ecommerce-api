const express = require("express");
const router = express.Router();

// Import product controller functions
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Import middlewares
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   POST /api/products
 * @desc    Create a product
 * @access  Admin
 */
router.post("/", protect, admin, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Admin
 */
router.put("/:id", protect, admin, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Admin
 */
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
