const express = require('express')
const router = express.Router()
const { verifyAdmin } = require('../middlewares/verify');
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts, } = require("../controllers/product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post( "/product/create", verifyAdmin, upload.array("productPicture"), createProduct );
router.get( "/products/:slug", getProductsBySlug );
router.get( "/product/:productId", getProductDetailsById );
router.delete( "/product/deleteProductById", verifyAdmin, deleteProductById );
router.post( "/product/getProducts", verifyAdmin, getProducts );

module.exports = router;