const express = require("express");
const {
  getUserAgreements,
  createUserAgreement,
  updateUserAgreement,
} = require("../controllers/userAgreement.controller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/user-agreements", getUserAgreements);
router.post("/user-agreements", adminAuth, createUserAgreement);
router.put("/user-agreements/:id", adminAuth, updateUserAgreement);

module.exports = router;
