var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment, Tag, ArticleTag } = Model;

router.post("/", (req, res) => {
  const { articleId, tagId } = req.body;
  console.log(typeof articleId);
  ArticleTag.create({
    articleId: articleId,
    tagId: tagId,
  })
    .then(() => {
      res.json({
        message: "Succesfully create new articleTag",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: err.message,
      });
    });
});

router.get("/", (req, res) => {
  ArticleTag.findAll()
    .then((data) => {
      res.json({
        message: "Succesfully get all article tag",
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
