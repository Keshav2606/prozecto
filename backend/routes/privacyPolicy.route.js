const express = require("express");
const {
  getPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy,
} = require("../controllers/privacyPolicy.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/privacy-policies", getPrivacyPolicies);
router.post("/privacy-policies", adminAuth, createPrivacyPolicy);
router.put("/privacy-policies/:id", adminAuth, updatePrivacyPolicy);

module.exports = router;
