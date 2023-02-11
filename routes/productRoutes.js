const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth.js");
const isAdmin = require("../middleware/isAdmin.js");

const productController = require("../controllers/productController.js");

router.get("/", productController.getAllProducts);
router.get("/admin", isAuth, isAdmin, productController.getAdminProducts);
router.get("/search", productController.searchProducts);
router.get("/categories", productController.getProductCategories);
router.get("/slug/:slug", productController.getSingleProduct);
router.get("/:id", productController.getSingleProductID);

router.post("/", isAuth, isAdmin, productController.createNewProduct);

router.put("/:id", isAuth, isAdmin, productController.updateProduct);

router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);

module.exports = router;
