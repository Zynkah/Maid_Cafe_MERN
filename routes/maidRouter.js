const express = require("express");
const Maids = require("../models/maids");
const authenticate = require("../authenticate");

const maidRouter = express.Router();

maidRouter
  .route("/")
  .get((req, res, next) => {
    Maids.find()
      .then((maid) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(maid);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Maids.create(req.body)
      .then((maid) => {
        console.log("Maid Created ", maid);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(maid);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /maids");
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Maids.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

maidRouter
  .route("/:maidId")
  .get((req, res, next) => {
    Maids.findById(req.params.maidId)
      .then((maid) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(maid);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /maids/${req.params.maidId}`);
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Maids.findById(
      req.params.maidId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((maid) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(maid);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Maids.findByIdAndDelete(req.params.maidId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = maidRouter;
