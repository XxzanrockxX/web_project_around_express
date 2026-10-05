const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports.deleteCard = (req, res) => {
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
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
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
};

module.exports.unlikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
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
};
