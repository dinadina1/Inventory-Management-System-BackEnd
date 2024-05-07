// require express
const express = require('express');

// require router
const router = express.Router();

// require controller
const userController = require('../controllers/userController');

router.get('/', userController.test);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password',userController.forgotPassword);
router.post('/forgot-password/:resetCode', userController.resetPassword);


// export router
module.exports = router;