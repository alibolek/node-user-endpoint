const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/user/:userId', userController.getUserInfo);
router.get('/user/:userId/avatar', userController.getAvatar);
router.delete('/user/:userId/avatar', userController.deleteAvatar);

module.exports = router;