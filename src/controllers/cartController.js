const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart does not exist, create one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });

      return res.status(201).json(cart);
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Increase quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price category"
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({
      message: "Item removed from cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };




