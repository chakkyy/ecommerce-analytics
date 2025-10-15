'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('EcommerceSegments', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('EcommerceSegments', 'rfm', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });
    await queryInterface.removeColumn('EcommerceSegments', 'ecommerceConnectId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('EcommerceSegments', 'description');
    await queryInterface.removeColumn('EcommerceSegments', 'rfm');
  },
};
