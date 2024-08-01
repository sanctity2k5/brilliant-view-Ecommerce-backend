const Product = require("../models/productModel");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");
exports.createProduct = createOne(Product);
exports.getAllProducts = getAll(Product);
exports.getProductById = getOne(Product, { path: "reviews" });
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
