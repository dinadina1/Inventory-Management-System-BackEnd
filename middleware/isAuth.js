// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require secret key
const { SECRET_KEY } = require("../utilities/config");

// function to check if authenticated or not
const isAuth = async (req, res, next) => {
  try {
    // get authToken from cookie
    const token = req.cookies.authToken || req.headers.authorization;
    // const token = req.headers.authorization;

    // return message if token not found
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // verify jwt token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }
      // return messages if token verified or not
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export isAuth
module.exports = isAuth;
