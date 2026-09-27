const express = require('express');

const users = require('../data/users');

const router = express.Router();

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find((item) => item._id === id);

  if (!user) {
    return res.status(404).json({
      message: 'ID de usuario no encontrado',
    });
  }

  res.json(user);
});

module.exports = router;