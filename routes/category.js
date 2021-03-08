const express = require('express')
const router = express.Router()
const { addCategory, getCategories, updateCategory, deleteCategory} = require('../controllers/category');
const { verifyAdmin } = require('../middlewares/verify');
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

router.post("/create", verifyAdmin, upload.single("categoryImage"), addCategory);

router.get("/", getCategories);

router.get("/update", verifyAdmin, upload.array("categoryImage"), updateCategory);

router.post("/delete", verifyAdmin, deleteCategory);
  
module.exports = router;

