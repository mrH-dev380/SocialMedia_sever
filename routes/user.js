const express = require('express');
const UserController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.put('/:id/follow', UserController.followUser)
router.put('/:id/unfollow', UserController.unFollowUser)
router.get('/', UserController.getAllFollowers)

module.exports = router