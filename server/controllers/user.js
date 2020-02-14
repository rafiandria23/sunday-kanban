"use strict";

const generateToken = require("../helpers/generate-token");
const { User } = require("../models");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static register(req, res, next) {
    const newUserData = {
      name: req.body.user_name,
      email: req.body.user_email,
      password: req.body.user_password
    };
    User.create(newUserData)
      .then(newUser => {
        res.status(201).json({ message: "Please login to continue!" });
      })
      .catch(err => {
        if (
          typeof err.message != "undefined" &&
          err.message.includes("ValidationError:")
        ) {
          next(createError(400, err.message));
        } else {
          console.log(err);
        }
      });
  }

  static login(req, res, next) {
    User.findOne({ where: { email: req.body.user_email } })
      .then(foundUser => {
        if (!foundUser) {
          throw createError(404, "User not found!");
        } else {
          const payload = {
            user_id: foundUser.id,
            email: foundUser.email
          };
          res.status(200).json({ token: generateToken(payload) });
        }
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

  static googleLogin(req, res, next) {
    let googleUser = null;
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(result => {
        const payload = result.getPayload();
        googleUser = { ...payload };
        return User.findOne({ where: { email: payload.email } });
      })
      .then(foundUser => {
        if (!foundUser) {
          const createData = {
            name: googleUser.name,
            email: googleUser.email
          };
          return User.create(createData);
        } else {
          const userData = {
            user_id: foundUser.id,
            email: foundUser.email
          };
          res.status(200).json({ token: generateToken(userData) });
        }
      })
      .then(newUser => {
        const userData = {
          user_id: newUser.id,
          email: newUser.email
        };
        res.status(200).json({ token: generateToken(userData) });
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static githubLogin(req, res, next) {
    //
  }
}

module.exports = UserController;
