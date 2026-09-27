const express = require('express');
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data/users.json');

const router = express.Router();

router.get('/users', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Ha ocurrido un error en el servidor',
      });
    }

    const users = JSON.parse(data);

    res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Ha ocurrido un error en el servidor',
      });
    }

    const users = JSON.parse(data);

    const user = users.find((item) => item._id === id);

    if (!user) {
      return res.status(404).json({
        message: 'ID de usuario no encontrado',
      });
    }

    res.json(user);
  });
});

module.exports = router;