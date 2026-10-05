const express = require('express');
const Card = require('../models/card');
const router = express.Router();

router.get('/cards', (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/cards', (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});

module.exports = router;