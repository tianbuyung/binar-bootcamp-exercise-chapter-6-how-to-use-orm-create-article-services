var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment, AddressUser } = Model;
/* GET janken list item. */

router.post("/", (req, res) => {
  const { username, password, email, phoneNumber } = req.body;
  Account.create({
    username,
    password,
    email,
    phoneNumber,
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
        model: AddressUser,
      },
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
        model: AddressUser,
      },
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
