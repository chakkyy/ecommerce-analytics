'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('EcommerceProducts', 'ecommerceCategoryTreesId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'EcommerceCategoryTrees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('EcommerceProducts', 'ecommerceCategoryTreesId');
  },
};
