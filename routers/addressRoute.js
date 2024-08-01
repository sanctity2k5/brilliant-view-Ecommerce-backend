const express = require("express");
const router = express.Router();
const {
  createAddress,
  getAllAddresses,
  getAddressById,
  deleteAddress,
  updateAddress,
} = require("../controllers/addressController");

router.route("/").get(getAllAddresses).post(createAddress);

router
  .route("/:id")
  .get(getAddressById)
  .patch(updateAddress)
  .delete(deleteAddress);

module.exports = router;
