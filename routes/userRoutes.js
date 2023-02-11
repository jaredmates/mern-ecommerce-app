const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth.js");
const isAdmin = require("../middleware/isAdmin.js");

const userController = require("../controllers/userController.js");

router.get("/", isAuth, isAdmin, userController.getAllUsers);
router.get("/:id", isAuth, isAdmin, userController.getUser);

router.post("/signin", userController.handleLogin);
router.post("/signup", userController.handleNewUser);

router.put("/profile", isAuth, userController.updateUserProfile);
router.put("/:id", isAuth, isAdmin, userController.updateUser);

router.delete("/:id", isAuth, isAdmin, userController.deleteUser);

module.exports = router;
