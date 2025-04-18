'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_profiles', [
      {
        userId: 1,
        password: '3030122a',
        createdAt: new Date(),
      },{
        userId: 2,
        password: '3030122a',
        createdAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profiles', null, {});
  }
};
