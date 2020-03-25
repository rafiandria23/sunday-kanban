"use strict";

const indexRouter = require("express").Router();
const userRouter = require("./user");
const categoryRouter = require("./category");
const taskRouter = require("./task");
const authenticate = require("../middlewares/authenticate");

indexRouter.use("/", userRouter);
indexRouter.use(authenticate);
indexRouter.use("/categories", categoryRouter);
indexRouter.use("/tasks", taskRouter);


module.exports = indexRouter;