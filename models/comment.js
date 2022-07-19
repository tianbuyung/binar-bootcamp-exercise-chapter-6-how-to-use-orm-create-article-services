"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   models.Comment.belongsTo(models.Article, { foreignKey: "articleId" });
      models.Comment.belongsTo(models.Article, { foreignKey: "articleId" });
      models.Comment.belongsTo(models.Account, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "comment_body",
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_id",
      },
      articleId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "article_id",
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
      modelName: "Comment",
      tableName: "comments",
      timestamps: false,
    }
  );
  return Comment;
};
