const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors());


// Connect Database
connectDB();

// Middleware to read JSON
app.use(express.json());

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const checkoutRoutes = require("./routes/checkoutRoutes");
app.use("/api/checkout", checkoutRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
