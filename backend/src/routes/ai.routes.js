const express = require('express');
const router = express.Router();

const { getReview } = require('../controllers/ai.controller');

router.post('/generate', getReview);

module.exports = router;