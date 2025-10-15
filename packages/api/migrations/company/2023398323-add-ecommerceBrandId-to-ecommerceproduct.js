'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('EcommerceProducts', 'ecommerceBrandId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'EcommerceBrands',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('EcommerceProducts', 'ecommerceBrandId');
  },
};
