"use strict";

const categoryRouter = require("express").Router();
const CategoryController = require("../controllers/category");

categoryRouter.get("/", CategoryController.findAll);

module.exports = categoryRouter;