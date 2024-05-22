// require user model
const User = require("../model/userModel");

// require bcrypt
const bcrypt = require("bcrypt");

// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require nodemailer
const nodemailer = require("nodemailer");

// require config from config.js
const { SECRET_KEY, PORT } = require("../utilities/config");

// create userController object
const userController = {
  // Register new user
  signup: async (req, res) => {
    try {
      // check if user already exist
      const isUserExist = await User.findOne({ email: req.body.email });

      // return message if user already exist
      if (isUserExist) {
        return res.status(400).json({
          message: "User already exist",
        });
      }

      // hash password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // create new user
      const newUser = await User.create(req.body);

      // return message
      if (newUser) {
        return res.status(200).json({
          message: "User registered successfully",
          data: newUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  //   Login user
  login: async (req, res) => {
    try {
      // find user
      const user = await User.findOne({ email: req.body.email });

      // return message if user not found
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      // compare password
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // return message if password is incorrect
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      // Generate jwt token
      const authToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
        },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      // set token in cookie
      res.cookie("authToken", authToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // return message
      res.status(200).json({
        message: "Login successfull",
        authToken: authToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // forgot password
  forgotPassword: async (req, res) => {
    try {
      // find user
      const user = await User.findOne({ email: req.body.email });

      // return message if user not found
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      // generate reset code
      const resetToken =
        Math.random().toString(36).substring(2, 6) +
        Math.random().toString(36).substring(2, 6);

      // Set password resetCode expiration time (5 minutes in milliseconds)
      const passwordResetCodeExpireIn = Date.now() + 600000;

      const urlPath = `https://inventorymangement.netlify.app/reset-password/${resetToken}`;

      // update reset code and reset code expire in db
      user.resetCode = resetToken;
      user.resetCodeExpireIn = passwordResetCodeExpireIn;

      // save user
      await user.save();

      // create transport to send mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dinad9355@gmail.com",
          pass: "zvrmnumrpbmenvdr",
        },
      });

      // message
      const message = {
        from: "dinad9355@gmail.com",
        to: user.email,
        subject: "Password Reset",
        html: `<p>You requested a password reset. This link is valid for up to 10 minutes. Please click the button below to reset your password:</p>
    <a href="${urlPath}" target="_blank" style="text-decoration: none;">
      <button style="background-color: blue; color: whitesmoke; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Reset Password</button>
    </a>`,
      };

      // Send mail
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // return message
      return res.status(200).json({
        message: "Password reset link sent to your email",
        path: urlPath,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  // reset password
  resetPassword: async (req, res) => {
    try {
      const resetCode = req.params.resetCode;

      // find reset code in db
      const user = await User.findOne({
        resetCode: resetCode,
        resetCodeExpireIn: { $gt: Date.now() },
      });

      // return message if reset code expired
      if (!user) {
        return res.status(400).json({
          message: "Reset code expired",
        });
      }

      // hash password
      req.body.password = await bcrypt.hash(req.body.newPassword, 10);

      // update password
      user.password = req.body.password;
      user.resetCode = null;
      user.resetCodeExpireIn = null;

      // save user
      await user.save();

      // return message
      return res.status(200).json({
        message: "Password reset successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  // logout user
  logout: async (req, res) => {
    try {
      // clear token from cookie
      res.clearCookie("authToken");

      // return message
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // get current logged in user profile
  profile: async (req, res) => {
    try {
      // find user data from db
      const user = await User.findOne({ _id: req.user.userId }).select([
        "-password",
        "-__v",
        "-resetCode",
        "-resetCodeExpireIn",
      ]);

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // create new user by admin
  createUser: async (req, res) => {
    try {
      // check if user already exist
      const isUserExist = await User.findOne({ email: req.body.email });

      // return message if user already exist
      if (isUserExist) {
        return res.status(400).json({
          message: "User already exist",
        });
      }

      // hash password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // create new user
      const newUser = await User.create(req.body);

      // return message
      if (newUser) {
        return res.status(200).json({
          message: "User registered successfully",
          data: newUser,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // change all user and admin password by admin
  changePassword: async (req, res) => {
    try {
      // check if user is exist
      const user = await User.findOne({ email: req.body.email });

      // return message if user not found
      if (!user) {
        return res.status(404).json({ message: "User does not exists" });
      }

      // hash password
      const hashPassword = await bcrypt.hash(req.body.password, 10);

      // update new password in db
      await User.updateOne({ _id: user._id }, { password: hashPassword });

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // change role of user by admin
  changeRole: async (req, res) => {
    try {
      // check if user is exist
      const user = await User.findOne({ email: req.body.email });

      // return message if user not found
      if (!user) {
        return res.status(404).json({ message: "User does not exists" });
      }

      // update role in db
      await User.updateOne({ _id: user._id }, { role: req.body.role });

      return res.status(200).json({ message: "Role changed successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // delete user by admin
  deleteUser: async (req, res) => {
    try {
      // check if user is exist
      const user = await User.findOne({ _id: req.params.userId });

      // return message if user not found
      if (!user) {
        return res.status(404).json({ message: "User does not exists" });
      }

      // delete user from db
      await User.deleteOne({ _id: user._id });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // get user by id
  getUserById: async (req, res) => {
    try {
      // find user by id
      const user = await User.findById(req.params.userId).select([
        "-__v",
        "-resetCode",
        "-resetCodeExpireIn",
      ]);

      // return message
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // update user by id
  updateUserById: async (req, res) => {
    try {
      // find user by id
      const user = await User.findById(req.params.userId);

      // return message if user not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // update user
      await User.updateOne({ _id: req.params.userId }, req.body);

      // return message
      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Get all users
  all: async (req, res) => {
    try {
      // get all users
      const users = await User.find().select([
        "-password",
        "-__v",
        "-resetCode",
        "-resetCodeExpireIn",
      ]);

      // return message
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

// export userController object
module.exports = userController;
