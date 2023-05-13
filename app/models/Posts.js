const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
  },
  { timestamps: true })

module.exports = mongoose.model('Posts', PostSchema)

