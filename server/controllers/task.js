"use strict";

const { Task } = require("../models");
const createError = require("http-errors");

class TaskController {
  static findAll(req, res, next) {
    const whereClause = {
      where: {
        UserId: req.user.user_id
      }
    };
    Task.findAll(whereClause)
      .then(result => {
        if (!result) {
          throw createError(404, "No tasks found!");
        } else {
          const payload = {
            tasks: result
          };
          res.status(200).json(payload);
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static create(req, res, next) {
    const createData = {
      name: req.body.task_name,
      description: req.body.task_description,
      CategoryId: req.params.category_id,
      UserId: req.user.user_id
    };

    Task.create(createData)
      .then(result => {
        const payload = {
          tasks: result,
          message: "Successfully created task!"
        };
        res.status(201).json(payload);
      })
      .catch(err => {
        if (
          typeof err.message != "undefined" &&
          err.message.includes("ValidationError:")
        ) {
          next(createError(400, err.message));
        } else {
          next(err);
        }
      });
  }

  static update(req, res, next) {
    const updateData = {
      name: req.body.task_name,
      description: req.body.task_description,
      CategoryId: req.params.category_id,
      UserId: req.user.user_id
    };

    Task.update(updateData, {
      where: { id: req.params.task_id, UserId: req.user.user_id }
    })
      .then(result => {
        updateData.id = req.params.task_id;
        const payload = {
          message: "Successfully updated task!",
          tasks: updateData
        };
        res.status(200).json(result);
      })
      .catch(err => {
        if (typeof err.message != "undefined" && err.message.includes("ValidationError:")) {
          next(createError(400, err.message));
        }
        else {
          next(err);
        }
      });
  }

  static destroy(req, res, next) {
    Task.destroy({
      where: { id: req.params.task_id, UserId: req.user.user_id }
    })
      .then(result => {
        const payload = {
          message: "Successfully deleted task!"
        };
        res.status(200).json(payload);
      })
      .catch(err => {
        if (
          typeof err.message != "undefined" &&
          err.message.includes("ValidationError:")
        ) {
          next(createError(400, err.message));
        } else {
          next(err);
        }
      });
  }
}

module.exports = TaskController;
