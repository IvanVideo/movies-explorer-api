const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getUserInfo } = require('../controllers/users');
const { updateUserInfo } = require('../controllers/users');

router.get('/me', auth, getUserInfo);
router.patch('/me', auth, updateUserInfo);

module.exports = router;