const express = require("express");
const banquetRouter = express.Router();

banquetRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the banquets to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the banquet: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /banquets");
  })
  .delete((req, res) => {
    res.end("Deleting all banquets");
  });

banquetRouter
  .route("/:banquetId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the banquet: ${req.params.banquetId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /banquets/${req.params.banquetId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the banquet: ${req.params.banquetId}\n`);
    res.end(`Will update the banquet: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting banquet: ${req.params.banquetId}`);
  });

module.exports = banquetRouter;
