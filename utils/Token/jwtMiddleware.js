const jwt = require("jsonwebtoken");
const {jwtDecode} = require("jwt-decode");
require('dotenv').config()
const {statusCode} = require('../Error/statusCode');
const { User } = require("../../schema/user.mongo.schema");

const createJwtToken = (payload) => {
  try {
    console.log(payload,"payload");
    const token = jwt.sign({payload}, process.env.SECRETKEY, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
const verifyJwtToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["access-token"];
    if (!token) {
      res
        .status(statusCode.BadRequest.statusCode)
        .json({ status: "error", message: "Enter token to proceed" });
      return;
    }
    decoded = jwt.verify(token, process.env.SECRETKEY);
    const decodedData = jwtDecode(token);
    const user = await User.findOne({  userName: decodedData.payload } );
    if (!user) {
      res.status(statusCode.BadRequest.statusCode).json({ status: "error", message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      res.status(statusCode.BadRequest.statusCode).json({ status: "error", message: "Token is Expired" });
    } else {
      res.status(statusCode.BadRequest.statusCode).json({ status: "error", message: error.message });
    }
  }
};

module.exports = { createJwtToken, verifyJwtToken };