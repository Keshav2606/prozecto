const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "No active admin found with this email." });
    }
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("adminToken");
  res.json({ success: true, message: "Logged out successfully" });
};

const updateCredentials = async (req, res) => {
  try {
    const { currentEmail, currentPassword, newEmail, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);

    if (
      admin.email !== currentEmail ||
      !(await admin.comparePassword(currentPassword))
    ) {
      return res
        .status(400)
        .json({ message: "Current credentials are incorrect" });
    }

    admin.email = newEmail;
    admin.password = newPassword;
    await admin.save();

    res.clearCookie("adminToken");

    res.json({
      success: true,
      message: "Credentials updated successfully. Please login again.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = (req, res) => {
  res.json({
    success: true,
    admin: { id: req.admin._id, email: req.admin.email },
  });
};

module.exports = {
  login,
  logout,
  updateCredentials,
  getProfile,
};
