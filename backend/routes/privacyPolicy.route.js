const express = require('express');
const { getPrivacyPolicies, createPrivacyPolicy, updatePrivacyPolicy } = require('../controllers/privacyPolicy.controller');

const router = express.Router();

router.get('/privacy-policies', getPrivacyPolicies);
router.post('/privacy-policies', createPrivacyPolicy);
router.put('/privacy-policies/:id', updatePrivacyPolicy);

module.exports = router;