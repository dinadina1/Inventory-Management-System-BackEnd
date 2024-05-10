// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const vendorController = require("../controllers/vendorController");

router.post("/register", isAuth, isAdmin, vendorController.register);
router.post("/update-vendor/:companyId",isAuth, isAdmin, vendorController.updateVendor);
router.get("/delete/:vendorId", isAuth, isAdmin, vendorController.deleteVendor);

router.get("/all", isAuth, vendorController.all);
router.get("/:vendorId", isAuth, vendorController.getVendor);
router.get("/state/:state", isAuth, vendorController.vendorStateWise);
router.get("/city/:city", isAuth, vendorController.vendorCityWise);

// export router
module.exports = router;

