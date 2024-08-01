const express = require("express");
const {
  getAllReviews,
  createReview,
  updateReview,
  setProductUserIds,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

// const router = express.Router();
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), setProductUserIds, createReview);

router.route("/:id").patch(updateReview);

// Route to get all reviews
// router.get(("/"), getAllReviews);
// // Route to create a new review
// router.post(("/"), protect, restrictTo("user"), createReview);

module.exports = router;
