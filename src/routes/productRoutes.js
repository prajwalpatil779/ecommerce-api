const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all products (Public)
router.get("/", getAllProducts);

// Add product (Admin only)
router.post("/", protect, adminOnly, addProduct);

// Update product (Admin only)
router.put("/:id", protect, adminOnly, updateProduct);

// Delete product (Admin only)
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
