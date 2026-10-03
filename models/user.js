const mongoose = require('mongoose');

const urlRegex = /^https?:\/\/(www\.)?[\w.-]+\.[a-z]{2,}(\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?$/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'Debe ser una URL válida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);