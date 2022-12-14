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

    for (let i = 1; i <= 20; i++) {
      data.push({
        username: `user-test-${i}`,
        password: `usertest${i}`,
        email: `user-test-${i}@gmail.com`,
        created_at: new Date(),
        updated_at: new Date(),
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
