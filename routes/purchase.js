// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const purchaseController = require('../controllers/purchaseController');

router.post('/register', isAuth, isAdmin, purchaseController.registerPurchaseOrder);
router.post('/update/:purchaseId', isAuth, isAdmin, purchaseController.updatePurchaseOrder);
router.get('/all', isAuth, purchaseController.all);
router.delete('/:purchaseId', isAuth, isAdmin, purchaseController.delete);
router.get('/order/:orderDate', isAuth, purchaseController.allOrderDatewise);

router.get('/all-stocks', isAuth, purchaseController.getStocks);
router.get('/purchaseOrder', isAuth, purchaseController.allPurchaseOrder);

router.get('/stockLevelExcel', isAuth, purchaseController.stockLevelExcel);
router.get('/purchaseOrderExcel', isAuth, purchaseController.purchaseOrderExcel);
router.get('/turnoverExcel', purchaseController.turnoverExcel);

// export router
module.exports = router;

