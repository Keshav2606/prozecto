const express = require('express');
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonial.controller');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.get('/testimonials', getTestimonials);
router.post('/testimonials', adminAuth, createTestimonial);
router.put('/testimonials/:id', adminAuth, updateTestimonial);
router.delete('/testimonials/:id', adminAuth, deleteTestimonial);

module.exports = router;