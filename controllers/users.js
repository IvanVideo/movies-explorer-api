const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data-error');
const InvalidEmail = require('../errors/invalid-email-error');
const NoRightsError = require('../errors/no-register-error');
const MustBeAuthorization = require('../errors/authorization-error');

const SALT_ROUNDS = 10;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'PageNotFound') {
        throw new NotFoundError('Пользователь не найден');
      }
      if (err.name === 'CastError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      runValidators: true,
      new: true,
    },

  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new IncorrectData('Email или пароль не могут быть пустыми');
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NoRightsError('Пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => { // eslint-disable-line
          if (!matched) {
            throw new MustBeAuthorization('Неправильные почта или пароль');
          } else {
            const token = jwt.sign({ _id: user._id }, '60c602f6dda3c7daf710dde1', { expiresIn: '7d' });
            return res.status(200).send({ token, message: 'Всё верно!' });
          }
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new InvalidEmail('Данная почта уже используется');
      } return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(200).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  login,
  createUser,
};
