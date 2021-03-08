const { verifyUser } = require("../middlewares");
const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", verifyUser, addOrder);
router.get("/getOrders", verifyUser, getOrders);
router.post("/getOrder", verifyUser, getOrder);

module.exports = router;