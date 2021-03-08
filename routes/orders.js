const express = require("express");
const { verifyUser } = require("../middlewares/verify");
const {
  updateOrder,
  getCustomerOrders,
} = require("../controllers/orders");
const router = express.Router();

router.post(`/order/update`, verifyUser, updateOrder);
router.post(`/order/getCustomerOrders`,verifyUser,getCustomerOrders);

module.exports = router;