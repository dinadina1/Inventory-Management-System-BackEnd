// require express
const express = require("express");

// require router
const router = express.Router();

// require middleware function
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

// require controller
const purchaseController = require("../controllers/purchaseController");

router.post("/register", isAuth, purchaseController.registerPurchaseOrder); //admin
router.post(
  "/update/:purchaseId",
  isAuth,
  purchaseController.updatePurchaseOrder
); //admin
router.get("/all", isAuth, purchaseController.all);
router.delete("/:purchaseId", isAuth, purchaseController.delete); //admin
router.get("/order/:orderDate", isAuth, purchaseController.allOrderDatewise);

router.get("/all-stocks", isAuth, purchaseController.getStocks);
router.get("/purchaseOrder", isAuth, purchaseController.allPurchaseOrder);
router.get("/turnover", isAuth, purchaseController.turnover);

router.get("/stockLevelExcel", purchaseController.stockLevelExcel);
router.get("/purchaseOrderExcel", purchaseController.purchaseOrderExcel);
router.get("/turnoverExcel", purchaseController.turnoverExcel);

router.get("/:purchaseId", isAuth, purchaseController.viewPurchaseOrderById);

// export router
module.exports = router;
