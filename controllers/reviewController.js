const Review = require("../models/reviewModel");
const { deleteOne, updateOne, createOne, getAll } = require("./handlerFactory");

exports.getAllReviews = getAll(Review);
exports.setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
