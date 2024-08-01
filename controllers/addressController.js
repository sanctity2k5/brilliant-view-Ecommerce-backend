const Address = require("../models/addressModel");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");

exports.createAddress = createOne(Address);
exports.getAllAddresses = getAll(Address);
exports.getAddressById = getOne(Address, {
  path: "",
  select: "",
});
exports.updateAddress = updateOne(Address);
exports.deleteAddress = deleteOne(Address);
