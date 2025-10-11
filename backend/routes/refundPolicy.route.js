const express = require('express');
const { getRefundPolicies, createRefundPolicy, updateRefundPolicy } = require('../controllers/refundPolicy.controller');

const router = express.Router();

router.get('/refund-policies', getRefundPolicies);
router.post('/refund-policies', createRefundPolicy);
router.put('/refund-policies/:id', updateRefundPolicy);

module.exports = router;