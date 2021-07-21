const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getCards } = require('../controllers/movies');
const { createCard } = require('../controllers/movies');
const { deleteCard } = require('../controllers/movies');
const { link } = require('../utils/constants');

router.get('/', auth, getCards);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().pattern(link).required(),
    trailer: Joi.string().pattern(link).required(),
    thumbnail: Joi.string().pattern(link).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    movieId: Joi.number().required(),
  }),
}), createCard);
router.delete('/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

module.exports = router;
