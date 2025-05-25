const express = require('express');
const { submitResponse, getAllResponses } = require('../Controllers/responseController');

const router = express.Router();

router.post('/', submitResponse);
router.get('/', getAllResponses);

module.exports = router;
