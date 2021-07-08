const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Movie = require('../models/movie');

const SALT_ROUNDS = 10;

const getMovies = (req, res, next) => {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
    });
}

const deleteMovie = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new NoRightsError('Вы не можете удалять чужие карточки');
      }
      Card.deleteOne({ _id: card._id })
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        });
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};