const express = require("express");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settings.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/settings", getSettings);
router.put("/settings", adminAuth, updateSettings);

module.exports = router;
