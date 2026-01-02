const Cart = require("../models/Cart");
const Order = require("../models/Order");

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    cart.products.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user._id,
      products: cart.products,
      totalAmount,
    });

    cart.products = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkout };
