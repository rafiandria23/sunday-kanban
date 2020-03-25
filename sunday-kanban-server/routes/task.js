"use strict";


const taskRouter = require("express").Router();
const authorize = require("../middlewares/authorize");
const TaskController = require("../controllers/task");

taskRouter.get("/", authorize, TaskController.findAll);
taskRouter.post("/:category_id", authorize, TaskController.create);
taskRouter.put("/:category_id/:task_id", authorize, TaskController.update);
taskRouter.delete("/:category_id/:task_id", authorize, TaskController.destroy);

module.exports = taskRouter;