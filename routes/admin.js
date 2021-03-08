const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin');

router.post("/register", adminController.register);

router.post("/login", adminController.login);

router.get("/logout", adminController.logout);

module.exports = router;

