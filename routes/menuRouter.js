const express = require("express");
const menuRouter = express.Router();

menuRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the menus to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the menu: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /menus");
  })
  .delete((req, res) => {
    res.end("Deleting all menus");
  });

menuRouter
  .route("/:menuId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the menu: ${req.params.menuId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /menus/${req.params.menuId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the menu: ${req.params.menuId}\n`);
    res.end(`Will update the menu: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting menu: ${req.params.menuId}`);
  });

module.exports = menuRouter;
