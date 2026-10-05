const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({
          message: err.message,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).json({
          message: 'ID de usuario no encontrado',
        });
      }

      return res.status(500).json({
        message: err.message,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).json({
          message: 'ID de usuario no encontrado',
        });
      }

      if (err.name === 'ValidationError') {
        return res.status(400).json({
          message: err.message,
        });
      }

      return res.status(500).json({
        message: err.message,
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).json({
          message: 'ID de usuario no encontrado',
        });
      }

      if (err.name === 'ValidationError') {
        return res.status(400).json({
          message: err.message,
        });
      }

      return res.status(500).json({
        message: err.message,
      });
    });
};