const express = require('express');

const User = require('../models/user');

const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data/users.json');

const router = express.Router();

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'ID de usuario no encontrado',
        });
      }

      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/users', (req, res) => {
  console.log(req.body);

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});

module.exports = router;