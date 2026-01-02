const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// PUBLIC: Get all products
router.get("/", getProducts);

// ADMIN: Create product
router.post("/", protect, admin, createProduct);

// ADMIN: Update product
router.put("/:id", protect, admin, updateProduct);

// ADMIN: Delete product
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
