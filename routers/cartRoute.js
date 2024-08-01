const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  getAllItemsInCart,
} = require("../controllers/cartController");

router.route("/add-item").post(addItemToCart);

router.route("/remove-item").patch(removeItemFromCart);

router.route("/delete-item").delete(deleteItemFromCart);

router.route("/:userId").get(getAllItemsInCart);

module.exports = router;
