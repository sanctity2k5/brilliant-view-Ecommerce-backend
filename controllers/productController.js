const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");

// Controller for creating a new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

// Controller for fetching all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// Controller for fetching a product by ID
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "No product found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
