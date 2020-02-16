"use strict";

if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// socket.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", indexRouter);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is listening on PORT ${port}!`);
});