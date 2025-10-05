const express = require('express');
const { getExample, postExample } = require('../controllers/exampleController');
const { exampleMiddleware } = require('../middleware/exampleMiddleware');

const router = express.Router();

router.get('/example', exampleMiddleware, getExample);
router.post('/example', exampleMiddleware, postExample);

module.exports = router;