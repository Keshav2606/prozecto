const express = require("express");
const {
  sendContactMessage,
  getContactMessages,
} = require("../controllers/contact.controller");

const router = express.Router();

router.post("/contact", sendContactMessage);
router.get("/contact", getContactMessages);

module.exports = router;
