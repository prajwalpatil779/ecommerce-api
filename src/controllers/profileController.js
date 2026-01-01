const User = require("../models/User");

// Get profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// Update profile
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.city = req.body.city || user.city;
  user.state = req.body.state || user.state;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

module.exports = { getProfile, updateProfile };
