const express = require('express');
const { getUserAgreements, createUserAgreement, updateUserAgreement } = require('../controllers/userAgreement.controller');

const router = express.Router();

router.get('/user-agreements', getUserAgreements);
router.post('/user-agreements', createUserAgreement);
router.put('/user-agreements/:id', updateUserAgreement);

module.exports = router;