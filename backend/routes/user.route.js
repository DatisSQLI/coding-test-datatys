const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.post('/user/auth', userController.auth)
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;