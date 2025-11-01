const express = require("express");
const {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faq.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/faqs", getFAQs);
router.post("/faqs", adminAuth, createFAQ);
router.put("/faqs/:id", adminAuth, updateFAQ);
router.delete("/faqs/:id", adminAuth, deleteFAQ);

module.exports = router;
