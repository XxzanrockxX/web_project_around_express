const express = require('express');

const cards = require('../data/cards');

const router = express.Router();

router.get('/cards', (req, res) => {
  res.json(cards);
});

module.exports = router;