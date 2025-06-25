'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('3031022a', 10)
    await queryInterface.bulkInsert('user_profiles', [
      {
        userId: 1,
        password: hashedPassword,
        createdAt: new Date(),
      },{
        userId: 2,
        password: hashedPassword,
        createdAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profiles', null, {});
  }
};
