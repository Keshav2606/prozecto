const express = require("express");
const {
  getRefundPolicies,
  createRefundPolicy,
  updateRefundPolicy,
} = require("../controllers/refundPolicy.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/refund-policies", getRefundPolicies);
router.post("/refund-policies", adminAuth, createRefundPolicy);
router.put("/refund-policies/:id", adminAuth, updateRefundPolicy);

module.exports = router;
