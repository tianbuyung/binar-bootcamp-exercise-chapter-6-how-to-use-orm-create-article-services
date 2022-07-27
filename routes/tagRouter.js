var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment, Tag, ArticleTag } = Model;

router.post("/", (req, res) => {
  Tag.create({
    tagName: req.body.tagName,
  })
    .then(() => {
      res.json({
        message: "Succesfully create new tag",
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Article,
        attributes: ["tagId", "id"],
      },
    ],
  })
    .then((data) => {
      res.json({
        message: "Succesfully get all tag",
        data,
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

module.exports = router;
