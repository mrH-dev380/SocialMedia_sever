const UserModel = require('../models/Users')
const bcrypt = require('bcrypt')

class UserController {

  // [GET] /user/:id
  async getUser(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findById(id);

      if (user) {
        // GET user info without password
        const { password, ...otherDetails } = user._doc

        res.status(200).json(otherDetails);
      } else {
        res.status(404).json('No such user exists');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [PUT] /user/:id
  async updateUser(req, res) {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;
  
    if (id === currentUserId || currentUserAdminStatus) {
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
  
        const user = await UserModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
  
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Access Denied! you can only update your own profile");
    }
  }

  // [DELETE] /user/:id
  async deleteUser(req, res) {
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body

    if (currentUserId === id || currentUserAdminStatus) {
      try {
        await UserModel.findByIdAndDelete(id)
        res.status(200).json('User deleted successfully')
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(500).json('Access Denied! You can only delete your own profile')
    }
  }

}

module.exports = new UserController()