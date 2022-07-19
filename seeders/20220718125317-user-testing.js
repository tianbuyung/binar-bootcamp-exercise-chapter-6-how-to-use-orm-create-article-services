"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [];

    for (let i = 7; i <= 20; i++) {
      data.push({
        username: `test-${i}`,
        password: `test${i}`,
        email: `test-${i}@gmail.com`,
      });
    }
    return queryInterface.bulkInsert("accounts", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await
     */
    queryInterface.bulkDelete("accounts", null, {});
  },
};
