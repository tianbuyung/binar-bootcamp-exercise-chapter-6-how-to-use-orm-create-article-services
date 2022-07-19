var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment } = Model;

/* GET janken list item. */

router.get("/", (req, res) => {
  Comment.findAll().then((data) => {
    res.json({
      data,
    });
  });
});

module.exports = router;
