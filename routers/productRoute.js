const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
.route("/products")
.post(protect, restrictTo('admin', 'editor'), createProduct)
.get(protect, getAllProducts);

router
  .route("/products/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
