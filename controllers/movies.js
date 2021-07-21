const Card = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const NoRightsError = require('../errors/no-register-error');
const IncorrectData = require('../errors/incorrect-data-error');
const {
  invalid,
  noCard,
  noDelCard,
} = require('../utils/constants');

function getCards(req, res, next) {
  return Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

const createCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Card.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
    movieId,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData(invalid);
      }
      throw err;
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(noCard);
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new NoRightsError(noDelCard);
      }
      return Card.remove()
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
