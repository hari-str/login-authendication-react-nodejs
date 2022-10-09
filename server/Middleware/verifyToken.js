const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const userModel = require("../Model/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.my_token;
  // console.log(token);

  if (!token) return next(errorHandler(401, "Token not Found!"));

  const authToken = jwt.verify(token, process.env.TOKENKEY);
  const rootUser = await userModel.findOne({ _id: authToken.id, id: token });

  if (!rootUser) return next(errorHandler(401, "user not found!"));
  req.token = token;
  req.rootUser = rootUser;
  next();
};

module.exports = verifyToken;
