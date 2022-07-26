"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tag.belongsToMany(models.Article, {
        through: { model: models.ArticleTag },
        foreignKey: "tagId",
      });
    }
  }
  Tag.init(
    {
      tagName: { type: DataTypes.STRING, field: "tag_name" },
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
      modelName: "Tag",
      tableName: "tags",
    }
  );
  return Tag;
};
