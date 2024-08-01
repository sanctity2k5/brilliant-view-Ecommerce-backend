const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, restrictTo } = require("../controllers/authController");
const router = express.Router();

router.use(protect);

router.route("/").post(createOrder).get(getAllOrders);

router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder);

module.exports = router;
