const APIfeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // Find the document by ID
    let query = Model.findById(req.params.id);

    // Apply population if options are provided
    if (popOptions) query = query.populate(popOptions);

    const data = await query;

    if (!data) {
      return next(new AppError("No document found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Create a new instance of APIfeatures with the query and request parameters
    const features = new APIfeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute the query
    const data = await features.query;

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });
