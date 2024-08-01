const Order = require("../models/orderModel");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");

exports.createOrder = createOne(Order);
exports.getAllOrders = getAll(Order);
exports.getOrderById = getOne(Order, {
  path: "user products.product",
  select: "name email products.product name price",
});
exports.updateOrder = updateOne(Order);
exports.deleteOrder = deleteOne(Order);
