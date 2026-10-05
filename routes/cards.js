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
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});

router.delete('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({
          message: err.message,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).json({
          message: 'ID de tarjeta no encontrado',
        });
      }

      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
