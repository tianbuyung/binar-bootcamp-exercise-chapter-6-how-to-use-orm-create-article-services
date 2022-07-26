"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, Comment, Account, Tag, ArticleTag }) {
      // define association here
      Article.hasMany(Comment, {
        foreignKey: "articleId",
      });
      Article.belongsTo(Account, {
        foreignKey: "userId",
      });
      Article.belongsToMany(Tag, {
        through: { model: ArticleTag },
        foreignKey: "articleId",
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: { type: DataTypes.INTEGER, field: "user_id" },
      tagId: { type: DataTypes.INTEGER, field: "tag_id" },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Article",
      tableName: "articles",
    }
  );
  Article.addHook("beforeUpdate", (article, options) => {
    article.updatedAt = new Date();
    console.log("article updated", article);
    console.log("options", options);
  });
  return Article;
};
