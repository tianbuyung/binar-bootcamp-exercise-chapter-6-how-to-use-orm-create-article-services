var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment, Tag, ArticleTag } = Model;
/* GET janken list item. */

// https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
router.get("/", (req, res) => {
  const query = req.query;
  console.log(typeof query.limit);
  let limit = Number(query.limit) || 5;
  let page = Number(query.page) || 1;
  let offset = (page - 1) * limit;
  Article.findAndCountAll({
    order: ["id"],
    limit: limit,
    offset,
    include: [
      {
        model: Comment,
        attributes: ["commentBody", "createdAt"],
        include: [
          {
            model: Account,
            attributes: ["username", "email"],
          },
        ],
      },
      {
        model: Account,
        attributes: ["username", "email"],
      },
      {
        model: Tag,
        attributes: ["id", "tagName"],
      },
    ],
  })
    .then((articles) => {
      res.json({
        articles,
        pages: `${page} from ${Math.ceil(articles.count / limit)}`,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
  // Article.findAll({
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ["commentBody", "createdAt"],
  //       include: [
  //         {
  //           model: Account,
  //           attributes: ["username", "email"],
  //         },
  //       ],
  //     },
  //     {
  //       model: Account,
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

router.post("/create", (req, res) => {
  Article.create({
    title: req.body.title,
    body: req.body.body,
    tagId: req.body.tagId,
    userId: req.headers.user_id,
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

router.put("/edit/:id", (req, res) => {
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
      tagId: req.body.tagId,
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

router.get("/:id", (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        attributes: ["commentBody", "createdAt"],
        include: [
          {
            model: Account,
            attributes: ["username", "email"],
          },
        ],
      },
      {
        model: Account,
        attributes: ["username", "email"],
      },
    ],
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

module.exports = router;
