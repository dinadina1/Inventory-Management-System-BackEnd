// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password',userController.forgotPassword);
router.post('/forgot-password/:resetCode', userController.resetPassword);

router.get('/profile', isAuth, userController.profile);
router.get('/logout', isAuth, userController.logout);

router.post('/createuser', isAuth, isAdmin, userController.createUser);
router.post('/change-password', isAuth, isAdmin, userController.changePassword);
router.post('/changeRole', isAuth, isAdmin, userController.changeRole);


// export router
module.exports = router;