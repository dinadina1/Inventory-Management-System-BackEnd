// function to check if admin
const isAdmin = (req, res, next) => {
  // check user role
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "User unAuthorized" });
  }
};

// export function
module.exports = isAdmin;
