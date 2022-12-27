const express = require("express");
const Banquets = require("../models/banquets");
const authenticate = require("../authenticate");

const banquetRouter = express.Router();

banquetRouter
  .route("/")
  .get((req, res, next) => {
    Banquets.find()
      .then((banquet) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(banquet);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Banquets.create(req.body)
      .then((banquet) => {
        console.log("Banquets Created ", banquet);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(banquet);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /banquets");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Banquets.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

banquetRouter
  .route("/:banquetId")
  .get((req, res, next) => {
    Banquets.findById(req.params.banquetId)
      .then((banquet) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(banquet);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /banquets/${req.params.banquetId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Banquets.findByIdAndUpdate(
      req.params.banquetId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((banquet) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(banquet);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Banquets.findByIdAndDelete(req.params.banquetId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = banquetRouter;
