const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.my_token;
  // console.log(token);

  if (!token) return next(errorHandler(401, "Token not Found!"));
  jwt.verify(token, process.env.TOKENKEY, (err, user) => {
    if (err) return next(errorHandler(401, "Authendication failed!"));
    req.user = user;
    // console.log(user);
    next();
  });
};

module.exports = verifyToken;
