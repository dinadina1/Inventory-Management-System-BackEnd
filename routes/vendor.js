// require express
const express = require('express');

// require router
const router = express.Router();

// require middleware function
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// require controller
const vendorController = require("../controllers/vendorController");

router.get("/vendor", vendorController.test);
router.post("/register", isAuth, isAdmin, vendorController.register);


// export router
module.exports = router;