const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Router/userRouter");

const { PORT, MONGODB_URL } = process.env;

//mongodb connect
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err + "DB error");
  });

//middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://login-signup-app.onrender.com",
  })
);
app.use(cookieParser());
app.use("/api", userRouter);
app.use((err, req, res, next) => {
  const status = err.status || 404;
  const message = err.message || "Custome server error";
  res.status(status).json({
    status,
    message,
  });
});

//server connect
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
