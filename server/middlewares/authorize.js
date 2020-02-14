"use strict";

const { Task } = require("../models");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  if (typeof req.params.category_id != "undefined") {
    const category_id = req.params.category_id;
    const user_id = req.user.user_id;
    const whereClause = {
      where: {
        CategoryId: category_id,
        UserId: user_id
      }
    };
    Task.findAll(whereClause)
      .then(result => {
        if (!result) {
          throw createError(401);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  } else {
    Task.findAll({ where: { UserId: req.user.user_id } })
      .then(result => {
        if (!result) {
          throw createError(401);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  }
};
