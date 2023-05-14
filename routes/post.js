const express = require('express');
const PostController = require('../app/controllers/PostController')
const router = express.Router();

router.get('/:id', PostController.getPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)
router.put('/:id/like', PostController.like)
router.get('/:id/timeline', PostController.timelinePost)
router.post('/', PostController.createPost)

module.exports = router