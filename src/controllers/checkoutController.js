const Stripe = require("stripe");
const Cart = require("../models/Cart");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount (in paise)
    let totalAmount = 0;

    cart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    // Stripe requires amount in smallest currency unit
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // INR → paise
      currency: "inr",
      metadata: {
        userId: req.user._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkout };
