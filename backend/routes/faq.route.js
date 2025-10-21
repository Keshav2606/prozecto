const express = require('express');
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faq.controller');

const router = express.Router();

router.get('/faqs', getFAQs);
router.post('/faqs', createFAQ);
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ);

module.exports = router;