const Cart = require("../models/Cart");
const Order = require("../models/Order");

/**
 * @desc    Checkout and place order
 * @route   POST /api/checkout
 * @access  Private
 */
const checkout = async (req, res) => {
  try {
    // Get user cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    // Create order
    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalPrice
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkout };
