"use strict";

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    next(createError(400, "Invalid token!"));
  }
};