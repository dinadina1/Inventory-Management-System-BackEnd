// require express
const express = require('express');

// require router
const router = express.Router();

// require controller
const userController = require('../controllers/userController');

router.get('/', userController.test);


// export router
module.exports = router;