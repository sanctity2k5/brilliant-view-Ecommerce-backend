const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Helper to get cart for a user or create a new one if no cart is found
const getCartForUser = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    // Create a new cart if one doesn't exist
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

// Add items to the cart (createCart)
exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { userId, productId, quantity, price } = req.body;

  const cart = await getCartForUser(userId);

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    // Update quantity if item already exists
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({ product: productId, quantity, price });
  }
  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// Remove item from cart (updateCart)
exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.body;

  const cart = await getCartForUser(userId);

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// Delete item from cart (deleteCart)
exports.deleteItemFromCart = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.body;

  const cart = await getCartForUser(userId);

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// Get all items in the cart (getAll)
exports.getAllItemsInCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const cart = await getCartForUser(userId);
  res.status(200).json({
    status: "success",
    data: {
      items: cart.items,
    },
  });
});
