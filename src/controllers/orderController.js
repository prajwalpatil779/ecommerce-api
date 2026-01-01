const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount: amount,
      paymentId: paymentId,
      status: "paid"
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};


module.exports = { createOrder, getMyOrders };

