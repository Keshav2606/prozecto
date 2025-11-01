const express = require("express");
const {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
} = require("../controllers/termsAndConditions.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/terms", getTermsAndConditions);
router.post("/terms", adminAuth, createTermsAndConditions);
router.put("/terms/:id", adminAuth, updateTermsAndConditions);

module.exports = router;
