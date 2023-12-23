const express = require('express');
const router = express.Router();
const { getDistinctValues } = require('../controllers/filter.controller');

router.get('/filter', getDistinctValues);

module.exports = router;
