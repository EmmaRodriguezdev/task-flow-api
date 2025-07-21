"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("workspaces_users_links", "createdAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("workspaces_users_links", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("workspaces_users_links", "createdAt");
    await queryInterface.removeColumn("workspaces_users_links", "updatedAt");
  },
};
