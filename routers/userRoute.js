const express = require('express');
const { signup, login, forgotPassword, resetPassword, updatePassword, protect } = require('../controllers/authController');
const { getAllUsers, updateMe, deleteMe } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get("/users", getAllUsers);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe)
router.delete('/deleteMe', protect, deleteMe)

module.exports = router;
