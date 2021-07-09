const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');

router.use('/users', users);
router.use('/movies', movies);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.use('*', (req, res, next) => {
  const err = new Error('Страница не найдена');
  err.statusCode = 404;
  next(err);
});

module.exports = router;
