const express = require("express");
const path = require('path');
const productRoutes = require("./routers/productRoute");
const userRoutes = require("./routers/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
// Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});
// Middleware to parse JSON bodies
app.use(express.json());

// Use the product routes
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
