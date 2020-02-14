"use strict";

const bcrypt = require("bcrypt");

module.exports = (input_password) => {
  return bcrypt.hashSync(input_password, 10);
};