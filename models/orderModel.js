const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "An order must belong to a user"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "An order must contain a product"],
        },
        quantity: {
          type: Number,
          required: [true, "An order must contain a quantity"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "An order must have a price"],
        },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      required: [true, "An order must have shipping address"],
    },
    totalPrice: {
      type: Number,
      required: [true, "An order must have a total price"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "on_transit",
        "arrived",
        "picked_up",
        "cancelled",
      ],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: [true, "Payment method is required"],
    },
    shippingDate: {
      type: Date,
    },
    pickedUpDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model based on the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
