"use strict";

const userRouter = require("express").Router();
const UserController = require("../controllers/user");


userRouter.post("/login", UserController.login);
// userRouter.post("/login/google", UserController.googleLogin);
// userRouter.post("/login/github", UserController.githubLogin);

userRouter.post("/register", UserController.register);

module.exports = userRouter;