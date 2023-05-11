const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mrH_SocialMedia')
    console.log('Connect to MongoDB successful!')
  } catch(error) {
    console.log('Connect to MongoDB failed')
  }
}

module.exports = {connect}