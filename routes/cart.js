const express = require("express");
const { addItemToCart, addToCart, getCartItems, removeCartItems } = require("../controller/cart");
const { verifyUser } = require("../middlewares");
const router = express.Router();

router.post("/user/cart/addtocart", verifyUser, addItemToCart);
//router.post('/user/cart/addToCartByLogin', verifyUser, addToCart);
router.post("/user/getCartItems", verifyUser, getCartItems);
//new update
router.post("/user/cart/removeItem", verifyUser, removeCartItems);

module.exports = router;