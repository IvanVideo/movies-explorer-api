const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getCards } = require('../controllers/movies');
const { createCard } = require('../controllers/movies');
const { deleteCard } = require('../controllers/movies');

router.get('/', auth, getCards);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().pattern(/^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/).required(),
    trailer: Joi.string().pattern(/^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/).required(),
    thumbnail: Joi.string().pattern(/^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    movieId: Joi.number(),
  }),
}), createCard);
router.delete('/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

module.exports = router;