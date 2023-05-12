const express = require('express');
const UserController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router