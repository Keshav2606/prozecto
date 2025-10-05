const express = require('express');
const { getFAQs, createFAQ, deleteFAQ } = require('../controllers/faq.controller');

const router = express.Router();

router.get('/faqs', getFAQs);
router.post('/faqs', createFAQ);
router.delete('/faqs/:id', deleteFAQ);

module.exports = router;