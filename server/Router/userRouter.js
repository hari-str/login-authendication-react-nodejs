const router = require("express").Router();
const {
  register,
  login,
  about,
  logout,
} = require("../Controller/userController");
const verifyToken = require("../Middleware/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.get("/getdata", verifyToken, about);
router.get("/logout", logout);

module.exports = router;
