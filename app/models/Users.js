const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String,  required: true },
  password : { type: String, required: true },
  firstname: { type: String, required: true },
  lastname : { type: String, required: true },
  isAdmin : { type: Boolean,  default: false, },
  profilePicture: String,
  coverPicture: String,
  about: String,
  livesin: String,
  worksAt: String,
  relationship: String,
  followers: [] ,
  following: []
  },
  {timestamps: true}
)

module.exports = mongoose.model('Users', UserSchema)