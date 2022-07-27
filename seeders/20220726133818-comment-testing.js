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
        comment_body: `comment-test-${i}`,
        article_id: Math.floor(Math.random() * 20 + 1),
        user_id: Math.floor(Math.random() * 20 + 1),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return queryInterface.bulkInsert("comments", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("comments", null, {});
  },
};
