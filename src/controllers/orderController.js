const Order = require("../models/Order");

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Create new order (used after checkout if needed)
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyOrders,
  createOrder
};
