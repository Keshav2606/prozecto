const express = require('express');
const { getTermsAndConditions, createTermsAndConditions, updateTermsAndConditions } = require('../controllers/termsAndConditions.controller');

const router = express.Router();

router.get('/terms', getTermsAndConditions);
router.post('/terms', createTermsAndConditions);
router.put('/terms/:id', updateTermsAndConditions);

module.exports = router;