var express = require("express");
var router = express.Router();
const Model = require("../models");
const { Account, Article, Comment, Tag, ArticleTag, AddressUser } = Model;

router.post("/", (req, res) => {
  const { alamat, kelurahan, kecamatan } = req.body;
  const { user_id } = req.headers;
  AddressUser.create({
    userId: user_id,
    alamat,
    kelurahan,
    kecamatan,
  })
    .then(() => {
      res.json({
        message: "Succesfully create new address",
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

router.get("/", (req, res) => {
  AddressUser.findAll({
    include: [
      {
        model: Account,
        attributes: ["username", "email"],
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
