const Card = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const NoRightsError = require('../errors/no-register-error');

function getCards(req, res, next) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

const createCard = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId,
  } = req.body;
  Card.create({
    country, director, duration, year, description, image, trailer, thumbnail, owner: req.user._id, nameRU, nameEN, movieId,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.movieId)
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
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
