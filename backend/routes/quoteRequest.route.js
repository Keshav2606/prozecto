const express = require('express');
const { getQuoteRequests, createQuoteRequest } = require('../controllers/quoteRequest.controller');

const router = express.Router();

router.get('/quote-requests', getQuoteRequests);
router.post('/quote-requests', createQuoteRequest);

module.exports = router;