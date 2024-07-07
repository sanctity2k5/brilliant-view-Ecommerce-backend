const express = require("express");
const productRoutes = require("./routers/productRoute");
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Use the product routes
app.use("/api", productRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});



module.exports = app;