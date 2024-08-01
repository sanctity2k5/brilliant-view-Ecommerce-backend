const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRoute = require("./reviewRoute");

const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin", "editor"), createProduct)
  .get(getAllProducts);

router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

// Creating reviews for product
router.use("/:productId/reviews", reviewRoute);

module.exports = router;
