const mongoose = require('mongoose');
const validator = require('validator');

const validateImage = /^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateImage.test(v),
      message: 'Недопустимое значение поля avatar',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateImage.test(v),
      message: 'Недопустимое значение поля avatar',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateImage.test(v),
      message: 'Недопустимое значение поля avatar',
    },
  },
  owner: {
    required: true
  },
  movieId: {
    required: true
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('movie', movieSchema);