const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getCards } = require('../controllers/movies');
const { createCard } = require('../controllers/movies');
const { deleteCard } = require('../controllers/movies');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:movieId', auth, deleteCard);

module.exports = router;
