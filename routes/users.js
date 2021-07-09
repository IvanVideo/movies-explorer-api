const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getUserInfo } = require('../controllers/users');
const { updateUserInfo } = require('../controllers/users');

router.get('/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), auth, getUserInfo);
router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateUserInfo);

module.exports = router;
