const express = require("express");
const maidRouter = express.Router();

maidRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the maids to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the maid: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /maids");
  })
  .delete((req, res) => {
    res.end("Deleting all maids");
  });

maidRouter
  .route("/:maidId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of the maid: ${req.params.maidId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /maids/${req.params.maidId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the maid: ${req.params.maidId}\n`);
    res.end(`Will update the maid: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting maid: ${req.params.maidId}`);
  });

module.exports = maidRouter;
