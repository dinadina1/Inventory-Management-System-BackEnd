// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');

// require controller
const userController = require('../controllers/userController');

router.get('/', userController.test);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password',userController.forgotPassword);
router.post('/forgot-password/:resetCode', userController.resetPassword);
router.get('/profile', isAuth, userController.profile);
router.get('/logout', isAuth, userController.logout);


// export router
module.exports = router;