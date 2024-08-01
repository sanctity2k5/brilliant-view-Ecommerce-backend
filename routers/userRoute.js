const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  logout,
} = require("../controllers/authController");
const {
  getAllUsers,
  updateMe,
  deleteMe,
  updateUser,
  getMe,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

router.route("/:id").patch(updateUser);

module.exports = router;
