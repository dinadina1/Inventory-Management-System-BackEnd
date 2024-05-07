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
  // test
  test: (req, res) => {
    res.status(200).json({
      message: "User Controller Test",
    });
  },

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
      const passwordResetCodeExpireIn = Date.now() + 300000;

      const urlPath = `http://${req.hostname}:${PORT}${req.path}/${resetToken}`;

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
        html: `<p>You requested a password reset. This link is valid for up to 5 minutes. Please click the button below to reset your password:</p>
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
        message: "Password reset link sent to your email", path: urlPath
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

      const {resetCode} = req.params;

      // find reset code in db
      const user = await User.findOne({resetCode: resetCode, resetCodeExpireIn: {$gt: Date.now()}});

      // return message if reset code expired
      if(!user || user == null){
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

    } catch(err){
      return res.status(500).json({
        message: err.message,
      });
    }
  }

};

// export userController object
module.exports = userController;
