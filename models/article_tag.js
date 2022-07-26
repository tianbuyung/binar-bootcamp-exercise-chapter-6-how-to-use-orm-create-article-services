"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleTag.init(
    {
      articleId: { type: DataTypes.INTEGER, field: "article_id" },
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
      modelName: "ArticleTag",
      tableName: "article_tags",
    }
  );
  return ArticleTag;
};
