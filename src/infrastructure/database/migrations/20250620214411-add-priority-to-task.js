'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'priority', {
      type: Sequelize.ENUM('LOW', 'MEDIUM', 'HIGH'),
      allowNull: false,
      defaultValue: 'MEDIUM'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'priority');
  }
};
