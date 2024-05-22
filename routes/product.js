// require express
const express = require("express");

// require router
const router = express.Router();

// require middleware function
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

// require controller
const productController = require("../controllers/productController");

router.get("/", isAuth, isAdmin, productController.test);
router.post("/register", isAuth, productController.register); //admin
router.put("/update/:productId", isAuth, productController.updateProduct); //admin
router.delete("/:productId", isAuth, productController.delete); //admin
router.get("/all", isAuth, productController.allProducts);
router.get("/:productId", isAuth, productController.getProduct);

// export router
module.exports = router;
