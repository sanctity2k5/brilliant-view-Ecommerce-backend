const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Address must have a user"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Address must have a phone number"],
  },
  address: {
    type: String,
    required: [true, "Address must be specified"],
  },
  city: {
    type: String,
    required: [true, "Address must have a city"],
  },
  landmark: {
    type: String,
    required: [
      true,
      "Address must have a landmark, popular church, school, market or any government building",
    ],
  },
  park: {
    type: String,
    required: [true, "Specify the nearest inter-state bus park"],
  },
  state: {
    type: String,
    required: [true, "Address must have a state"],
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  // postalCode: {
  //   type: String,
  //   required: true,
  // },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
