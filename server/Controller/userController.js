const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../Middleware/errorHandler");

//register
const register = async (req, res, next) => {
  const { name, email, mobile, password, cpassword } = req.body;
  if (!name || !email || !mobile || !password || !cpassword) {
    return next(errorHandler(404, "Plz filled the field!"));
  }
  try {
    const hashpwd = await bcrypt.hash(password, 7);
    const user = new userModel({
      name,
      email,
      mobile,
      password: hashpwd,
      cpassword: hashpwd,
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
    const userPwd = await bcrypt.compare(password, user.password);
    if (!userPwd) return next(errorHandler(401, "Password is not valid!"));

    //generate Token
    const userToken = jwt.sign({ id: user._id }, process.env.TOKENKEY);
    // console.log(token);
    res
      .cookie("my_token", userToken, {
        httpOnly: true,
        // expires: new Date(Date.now() + 5000),
      })
      .status(200)
      .json({
        status: 200,
        message: "Login sucessfull",
        token: userToken,
      });

    // res.status(200).json({
    //   status: 200,
    //   message: "Login sucessfull",
    // });
  } catch (err) {
    next(err);
  }
};

//logout
const logout = (req, res, next) => {
  res
    .clearCookie("my_token", { path: "/" })
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

//getdata
const about = async (req, res, next) => {
  try {
    // let token = req.cookies.my_token;
    // console.log(token);
    const getUser = await userModel
      .find({})
      .select(["-password", "-cpassword"]);

    res.status(200).json({
      data: getUser,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login, about, logout };
