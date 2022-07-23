const express = require("express");
const router = express.Router();
const Model = require("../models");
const { Account, Article, Comment } = Model;
/* GET janken list item. */

router.post("/", (req, res) => {
  Account.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then(() => res.json({ message: "Succesfully created new user" }))
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});
router.get("/", (req, res) => {
  Account.findAll({
    include: [
      {
        model: Article,
      },
      {
        model: Comment,
      },
    ],
  })
    .then((data) => {
      res.json({
        message: "Testing",
        data,
      });
    })
    .catch((err) => {
      res.json({ message: "error", err });
    });
});

router.get("/:id", (req, res) => {
  Account.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Article,
      },
      {
        model: Comment,
      },
    ],
  })
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
});

module.exports = router;
