// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const productController = require('../controllers/productController');

router.get('/', isAuth, isAdmin, productController.test);
router.post('/register', isAuth, isAdmin, productController.register);
router.put('/update/:productId', isAuth, isAdmin, productController.updateProduct);
router.delete('/:productId', isAuth, isAdmin, productController.delete);
router.get('/all', isAuth, productController.allProducts);
router.get('/:productId', isAuth, productController.getProduct);

// export router
module.exports = router;

