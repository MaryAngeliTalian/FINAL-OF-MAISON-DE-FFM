const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// DELETE user by ID
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
