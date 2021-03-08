const express = require('express');
const { verifyUser } = require('../middlewares');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();


router.post('/user/address/create', verifyUser, addAddress);
router.post('/user/getaddress', verifyUser, getAddress);

module.exports = router;