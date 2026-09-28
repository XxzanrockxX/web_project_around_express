const express = require('express');
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '../data/cards.json');

const router = express.Router();

router.get('/cards', (req, res) => {
  fs.readFile(cardsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Ha ocurrido un error en el servidor',
      });
    }

    const cards = JSON.parse(data);

    res.json(cards);
  });
});

module.exports = router;