// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const purchaseController = require('../controllers/purchaseController');

router.get('/', purchaseController.test);

// export router
module.exports = router;