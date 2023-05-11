const UserModel = require('../models/Users') 
const bcrypt = require('bcrypt');

class AuthController {
  // [POST] /register
  async register(req, res) {
    const { username, password, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      password: hashedPass,
      firstname,
      lastname,
    });

    try {
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body

    try {
      const user = await UserModel.findOne({ username: username})

      if(user) {
        const valid = await bcrypt.compare(password, user.password)

        valid ? res.status(200).json(user) : res.status(400).json("Wrong password")
      } else {
        res.status(400).json("User dose not exist")
      }
    } catch(error) {
      res.status(500).json({message: error.message})
    }
  }
}

module.exports = new AuthController()