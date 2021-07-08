const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getMovies } = require('../controllers/movies');
const { createMovie } = require('../controllers/movies');
const { deleteMovie } = require('../controllers/movies');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovie);
router.delete('/movies/movieId', auth, deleteMovie);

module.exports = router;