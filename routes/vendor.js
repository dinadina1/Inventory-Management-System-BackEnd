// require express
const express = require("express");

// require router
const router = express.Router();

// require middleware function
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

// require controller
const vendorController = require("../controllers/vendorController");

router.post("/register", isAuth, vendorController.register); //admin
router.post("/update-vendor/:companyId", isAuth, vendorController.updateVendor); //admin
router.get("/delete/:vendorId", isAuth, vendorController.deleteVendor); //admin

router.get("/all", isAuth, vendorController.all);
router.get("/:vendorId", isAuth, vendorController.getVendor);
router.get("/state/:state", isAuth, vendorController.vendorStateWise);
router.get("/city/:city", isAuth, vendorController.vendorCityWise);

// export router
module.exports = router;
