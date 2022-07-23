const express = require("express");
const router = express.Router();
const Model = require("../models");
const { Account, Article, Comment } = Model;
const { client } = require("../cached/redis");
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkRoleSuperAdmin = require("../middlewares/checkRoleSuperAdmin");
// import { client } from "../cached/redis";
/* GET janken list item. */

// https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
router.get("/", checkAuthentication, checkRoleSuperAdmin, async (req, res) => {
  console.log("req, user", req.user);
  const query = req.query;
  let limit = query.limit || 5;
  let page = query.page || 1;
  let offset = (page - 1) * limit;
  try {
    const articlesRedis = await client.get(`article:list:${page}`);
    if (articlesRedis) {
      res.json({
        articles: JSON.parse(articlesRedis),
        pages: Math.ceil(JSON.parse(articlesRedis).count / limit),
        type: "redis",
      });
    } else {
      const articles = await Article.findAndCountAll({
        order: ["id"],
        limit,
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
        ],
      });
      await client.set(`article:list:${page}`, JSON.stringify(articles));
      res.json({
        articles,
        pages: Math.ceil(articles.count / limit),
        type: "db",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      error,
    });
  }
});

router.get("/:id", checkAuthentication, async (req, res) => {
  try {
    const articleRedis = await client.get(`article:detail:${req.params.id}`);
    if (articleRedis) {
      res.json({
        data: JSON.parse(articleRedis),
        type: "redis",
      });
    } else {
      const article = await Article.findOne({
        where: {
          id: req.params.id,
        },
      });
      await client.set(
        `article:detail:${article.id}`,
        JSON.stringify(article),
        { EX: 60 * 60 }
      );
      res.json({
        data: article,
        type: "db",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      error,
    });
  }
  // Article.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((data) => {
  //     Account.findAll().then((accounts) => {
  //       res.json({
  //         data,
  //         accounts,
  //       });
  //     });
  //   })
  //   .catch((err) =>
  //     res.json({
  //       err,
  //     })
  //   );
});

router.post("/", checkAuthentication, async (req, res) => {
  try {
    const articleCreated = await Article.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.headers.user_id,
    });
    await client.set(
      `article:detail:${articleCreated.id}`,
      JSON.stringify(articleCreated)
    );
    res.json({
      message: "Succesfully create new article",
      articleCreated,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
  // Article.create({
  // title: req.body.title,
  // body: req.body.body,
  // })
  //   .then((article) => {
  //     console.log(article);
  // res.json({
  //   message: "Succesfully create new article",
  // });
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  // res.json({
  //   message: err.message,
  // });
  //   });
});

router.put("/:id", checkAuthentication, async (req, res) => {
  try {
    await Article.update(
      {
        body: req.body.body,
        title: req.body.title,
        approved: req.body.approved,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    client.del(`article:detail:${req.params.id}`);
    res.json({
      message: "Succesfully edit",
    });
  } catch (error) {
    console.log("Gagal mengupdate artikel!", error);
  }
  // Article.update(
  //   {
  //     body: req.body.body,
  //     title: req.body.title,
  //     approved: req.body.approved,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //     individualHooks: true,
  //   }
  // )
  //   .then(() => {
  //     console.log("Artikel berhasil diupdate");
  // res.json({
  //   message: "Succesfully edit",
  // });
  //   })
  //   .catch((err) => {
  //     console.error("Gagal mengupdate artikel!");
  //   });
});

module.exports = router;
