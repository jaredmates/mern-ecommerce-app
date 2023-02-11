const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const isAuth = require("../middleware/isAuth.js");
const isAdmin = require("../middleware/isAdmin.js");

const uploadController = require("../controllers/uploadController.js");

router.post(
  "/",
  isAuth,
  isAdmin,
  upload.single("file"),
  uploadController.handleUpload
);

module.exports = router;
