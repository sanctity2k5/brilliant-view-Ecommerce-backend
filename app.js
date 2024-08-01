const express = require("express");
const path = require("path");
const productRoutes = require("./routers/productRoute");
const userRoutes = require("./routers/userRoute");
const reviewRoutes = require("./routers/reviewRoute");
const orderRoutes = require("./routers/orderRouter");
const addressRoutes = require("./routers/addressRoute");
const cartRoutes = require("./routers/cartRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
// Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: "Too many requests from this Ip, Please try again in an hour",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Prevent parameter pollution
app.use(hpp());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});
// Middleware to parse JSON bodies
app.use(express.json({ limit: "10kb" }));

// Use the product routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
