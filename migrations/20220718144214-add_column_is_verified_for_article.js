"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn("articles", "is_verified", {
      type: Sequelize.BOOLEAN,
    });
    queryInterface.addColumn("accounts", "is_verified", {
      type: Sequelize.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("articles", "is_verified");

    queryInterface.removeColumn("accounts", "is_verified");
  },
};
