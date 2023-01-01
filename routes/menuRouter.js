const express = require("express");
const Menu = require("../models/menu");
const authenticate = require("../authenticate");
const cors = require("./cors");

const menuRouter = express.Router();

menuRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Menu.find()
      .then((menu) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(menu);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Menu.create(req.body)
        .then((menu) => {
          console.log("Menu Created ", menu);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(menu);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /menus");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Menu.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

menuRouter
  .route("/:menuId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Menu.findById(req.params.menuId)
      .then((menu) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(menu);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /menus/${req.params.menuId}`);
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Menu.findByIdAndUpdate(
        req.body.menuId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((menu) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(menu);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Menu.findByIdAndDelete(req.body.menuId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

menuRouter
  .route("/:menuId/comments")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Menu.findById(req.params.menuId)
      .populate("comments.author")
      .then((menu) => {
        if (menu) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(menu.comments);
        } else {
          err = new Error(`Menu ${req.params.menuId} not found`);
          err.status = 400;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Menu.findById(req.params.menuId)
      .then((menu) => {
        if (menu) {
          req.body.author = req.user._id;
          menu.comments.push(req.body);
          menu
            .save()
            .then((menu) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(menu);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Menu ${req.params.menuId} not found`);
          err.status = 400;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supported on /menus/${req.params.menuId}/comments`
    );
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Menu.deleteMany();
      Menu.findById(req.params.menuId)
        .then((menu) => {
          if (menu) {
            for (let i = menu.comments.length - 1; i >= 0; i--) {
              menu.comments.id(menu.comments[i]._id).remove();
            }
            menu
              .save()
              .then((menu) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(menu.comments);
              })
              .catch((err) => next(err));
          } else {
            err = new Error(`Menu ${req.params.menuId} not found`);
            err.status = 400;
            return next(err);
          }
        })
        .catch((err) => next(err));
    }
  );

menuRouter
  .route("/:menuId/comments/:commentId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Menu.findById(req.params.menuId)
      .populate("comments.author")
      .then((menu) => {
        if (menu && menu.comments.id(req.params.commentId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(menu.comments.id(req.params.commentId));
        } else if (!menu) {
          err = new Error(`Menu ${req.params.menuId} not found`);
          err.status = 400;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 400;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `POST operation not supported on /menu/${req.params.menuId}/comments/${req.params.commentId}`
      );
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Menu.findById(req.params.menuId)
      .then((menu) => {
        if (
          !req.user._id.equals(
            campsite.comments.id(req.params.commentId).author._id
          )
        ) {
          err = new Error("Who Are YOU!?");
          err.status = 403;
          return next(err);
        }
        if (menu && menu.comments.id(req.params.commentId)) {
          if (req.body.rating) {
            menu.comments.id(req.params.commentId).rating = req.body.rating;
          }
          if (req.body.text) {
            menu.comments.id(req.params.commentId).text = req.body.text;
          }
          menu
            .save()
            .then((menu) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(menu);
            })
            .catch((err) => next(err));
        } else if (!menu) {
          err = new Error(`Menu ${req.params.menuId} not found`);
          err.status = 400;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 400;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Menu.deleteMany();
    Menu.findById(req.params.menuId)
      .then((menu) => {
        if (
          !req.user._id.equals(
            campsite.comments.id(req.params.commentId).author._id
          )
        ) {
          err = new Error("Incorrect User");
          err.status = 403;
          return next(err);
        }
        if (menu && menu.comments.id(req.params.commentId)) {
          menu.comments.id(req.params.commentId).remove();
          menu
            .save()
            .then((menu) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(menu);
            })
            .catch((err) => next(err));
        } else if (!menu) {
          err = new Error(`Menu ${req.params.menuId} not found`);
          err.status = 400;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 400;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = menuRouter;
