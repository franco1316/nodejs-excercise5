const express = require('express');

const { renderIndex } = require('../controllers/views');

const router = express.Router();

router.get('/', renderIndex);

module.exports = { views: router };