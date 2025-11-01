const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  updateCredentials,
  getProfile,
} = require("../controllers/auth.controller");
const adminAuth = require("../middleware/adminAuth");

router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.put("/auth/credentials", adminAuth, updateCredentials);
router.get("/auth/profile", adminAuth, getProfile);

module.exports = router;
