"use strict";

const { Category } = require("../models");
const createError = require("http-errors");

class CategoryController {
  static findAll(req, res, next) {
    Category.findAll()
      .then(result => {
        if (!result) {
          throw createError(404, "No categories found!");
        }
        else {
          const payload = {
            categories: result
          };
          req.io.emit("reload");
          res.status(200).json(payload);
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = CategoryController;