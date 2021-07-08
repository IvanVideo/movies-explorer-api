const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');

router.use('/users', users);
router.use('/movies', movies);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;