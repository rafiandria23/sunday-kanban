"use strict";

module.exports = (err, req, res, next) => {
  if (err) {
    if (err.status == 401) {
      res.status(401).json({ message: "You are not authorized!" });
    }
    else if (err.status != 500) {
      res.status(err.status).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: "Internal server error!" });
    }
  }
};