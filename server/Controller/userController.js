const userModel = require("../Model/userModel");
// const bcrypt = require("bcrypt");
const errorHandler = require("../Middleware/errorHandler");

//register
const register = async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return next(errorHandler(404, "Plz filled the field!"));
  }
  try {
    // const hashpwd = await bcrypt.hash(req.body.password, 7);
    const user = new userModel({
      ...req.body,
    });

    //validate
    const exitEmail = await userModel.findOne({ email: email });
    if (exitEmail) return next(errorHandler(404, "Email is already exits!"));

    if (password != cpassword)
      return next(errorHandler(404, "Password is not matching!"));
    const exitName = await userModel.findOne({ name: name });
    if (exitName) return next(errorHandler(404, "Username is already exits!"));

    const userSave = await user.save();
    res.status(200).json({
      message: "Register succesfully",
      Data: userSave,
    });
  } catch (err) {
    console.log(err);
  }
};

//login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(404, "Plz filled the field!"));
    }
    const user = await userModel.findOne({ email: email });
    if (!user) return next(errorHandler(401, "Email is not valid!"));
    const userPwd = await userModel.findOne({ password: password });
    if (!userPwd) return next(errorHandler(401, "Password is not valid!"));

    res.status(200).json({
      status: 200,
      message: "Login sucessfull",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
