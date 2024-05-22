// require express
const express = require("express");

// require router
const router = express.Router();

// require middleware function
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

// require controller
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:resetCode", userController.resetPassword);

router.get("/profile", isAuth, userController.profile);
router.get("/logout", userController.logout);

// Admin Routes
router.post("/createuser", isAuth, isAdmin, userController.createUser);
router.post("/change-password", isAuth, isAdmin, userController.changePassword);
router.post("/changeRole", isAuth, isAdmin, userController.changeRole);
router.get("/allusers", isAuth, isAdmin, userController.all);
router.get("/:userId", isAuth, isAdmin, userController.getUserById);
router.delete("/:userId", isAuth, isAdmin, userController.deleteUser);
router.put("/:userId", isAuth, isAdmin, userController.updateUserById);

// export router
module.exports = router;
