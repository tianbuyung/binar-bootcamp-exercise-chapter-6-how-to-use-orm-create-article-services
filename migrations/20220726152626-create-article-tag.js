"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("article_tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      article_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "articles",
          key: "id",
          as: "articleId",
        },
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tags",
          key: "id",
          as: "tagId",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("article_tags");
  },
};
