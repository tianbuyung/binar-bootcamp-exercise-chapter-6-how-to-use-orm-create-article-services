"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, Comment, Account }) {
      // define association here
      // models.Article.hasMany(models.Comment, {
      //   foreignKey: "articleId",
      // });
      Article.hasMany(Comment, {
        foreignKey: "articleId",
        as: "comments",
      });
      Article.belongsTo(Account, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
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
      timestamps: false,
    }
  );

  Article.addHook("beforeUpdate", (article, options) => {
    article.updatedAt = new Date();
    console.log("article updated", article);
    console.log("options", options);
  });

  return Article;
};
