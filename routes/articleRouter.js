var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment } = Model;
/* GET janken list item. */

// https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
router.get("/", (req, res) => {
  const query = req.query;
  let limit = query.limit || 5;
  let page = query.page;
  let offset = (page - 1) * limit;
  Article.findAndCountAll({
    order: ["id"],
    limit: limit,
    offset,
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["commentBody", "createdAt"],
        include: [
          {
            model: Account,
            as: "user",
            attributes: ["username", "email"],
          },
        ],
      },
      {
        model: Account,
        as: "user",
        attributes: ["username", "email"],
      },
    ],
  })
    .then((articles) => {
      res.json({
        articles,
        pages: Math.ceil(articles.count / limit),
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
  // Article.findAll({
  //   order: ["id"],
  //   include: [
  //     {
  //       model: Comment,
  //       as: "comments",
  //       attributes: ["commentBody", "createdAt"],
  //       include: [
  //         {
  //           model: Account,
  //           as: "user",
  //           attributes: ["username", "email"],
  //         },
  //       ],
  //     },
  //     {
  //       model: Account,
  //       as: "user",
  //       attributes: ["username", "email"],
  //     },
  //   ],
  // })
  //   .then((data) => {
  //     res.json({
  //       data,
  //     });
  //   })
  //   .catch((err) =>
  //     res.json({
  //       err,
  //     })
  //   );
});

router.get("/:id", (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) =>
      res.json({
        err,
      })
    );
});

router.post("/articles", (req, res) => {
  if (title.length < 4 || title.length > 100) {
    res.json("");
  }
  Article.create({
    title: req.body.title,
    body: req.body.body,
  })
    .then((article) => {
      console.log(article);
      res.json({
        message: "Succesfully create new article",
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.json({
        message: err.message,
      });
    });
});

router.put("/:id", (req, res) => {
  // hasing password
  //   Article.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //   }).then((article) => {
  //     article.body = req.body.body;
  //     article.title = req.body.title;
  //     approved = req.body.approved;
  //     article.save();
  //   });
  Article.update(
    {
      body: req.body.body,
      title: req.body.title,
      approved: req.body.approved,
    },
    {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    }
  )
    .then(() => {
      console.log("Artikel berhasil diupdate");
      res.json({
        message: "Succesfully edit",
      });
    })
    .catch((err) => {
      console.error("Gagal mengupdate artikel!");
    });
});

module.exports = router;
