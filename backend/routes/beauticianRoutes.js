const express = require('express');
const router = express.Router();
const beauticianController = require('../controllers/beauticianController');
const { auth } = require('../middleware/auth');

// CREATE
router.post('/', auth, beauticianController.createBeautician);

// READ ALL
router.get('/', auth, beauticianController.getAllBeauticians);

// READ ONE
router.get('/:id', auth, beauticianController.getBeauticianById);

// UPDATE
router.put('/:id', auth, beauticianController.updateBeautician);

// DELETE
router.delete('/:id', auth, beauticianController.deleteBeautician);

module.exports = router;
