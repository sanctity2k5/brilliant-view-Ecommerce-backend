const mongoose = require("mongoose");

// Define the schema for the Product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      min: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // This only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "A product must have a category"],
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image URL"],
    },
    images: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware to calculate priceDiscount before saving
productSchema.pre("save", function (next) {
  this.priceDiscount =
    this.price - this.price * (this.discountPercentage / 100);
  next();
});

// Create the model based on the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
