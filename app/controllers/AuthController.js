const UserModel = require('../models/Users') 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  // [POST] /register
  async register(req, res) {
    const { username, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    req.body.password = hashedPass

    const newUser = new UserModel(req.body);

    try {
      // Additon new
      const oldUser = await UserModel.findOne({username})
      if (oldUser) {
        return res.status(400).json({ message: 'User already exists'})
      }

      const user = await newUser.save();
      const token = jwt.sign({
        username: user.username,
        id: user._id
      }, "MERN", {expiresIn: '1h'})
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [POST] /login
  async login(req, res) {
    const { username, password } = req.body

    try {
      const user = await UserModel.findOne({ username: username})

      if(user) {
        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
          res.status(400).json('Wrong password')
        } else {
          const token = jwt.sign({
            username: user.username,
            id: user._id
          }, "MERN", {expiresIn: '1h'})
          res.status(200).json({ user, token })
        }
      } else {
        res.status(400).json("User dose not exist")
      }
    } catch(error) {
      res.status(500).json({message: error.message})
    }
  }
}

module.exports = new AuthController()