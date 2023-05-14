const mongoose = require('mongoose');
const PostModel = require('../models/Posts')
const UserModel = require('../models/Users')

class PostController {

  // [POST] /post/create
  async createPost(req, res) {
    const newPost = new PostModel(req.body);

    try {
      await newPost.save();
      res.status(200).json("Post created!");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] /post/:id
  async getPost(req, res) {
    const id = req.params.id;

    try {
      const post = await PostModel.findById(id);
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [PUT] /post/:id
  async updatePost(req, res) {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
      const post = await PostModel.findById(postId);
      if (post.userId === userId) {
        await post.updateOne({ $set: req.body})
        res.status(200).json('Post Updated')
      } else {
        res.status(403).json('Action forbidden')
      }
    } catch(error) {
      res.status(500).json(error)
    }
  }

  //[DELETE] /post/:id
  async deletePost(req, res) {
    const postId = req.params.id
    const { userId } = req.body

    try {
      const post = await PostModel.findById(postId)
      if (post.userId === userId) {
        await post.deleteOne()
        res.status(200).json('Post Deleted Successfully')
      } else {
        res.status(403).json('Action forbidden')
      }
    } catch(error) {
      res.status(500).json(error)
    }
  }

  // [PUT] /post/:id/like
  async like(req, res) {
    const postId = req.params.id
    const { userId } = req.body

    try {
      const post = await PostModel.findById(postId)

      if(!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId}})
        res.status(200).json('Post liked!')
      } else {
        await post.updateOne({ $pull: { likes: userId}})
        res.status(200).json('Post unlike!')
      }
    } catch(error) {
      res.status(500).json(error)
    }
  }

  // [GET] /post/:id/timeline
  async timelinePost(req, res) {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await PostModel.find({ userId: userId })
      const followingPosts = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ])
      
      res.status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts))
        .sort({ timestamp: -1 })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new PostController()