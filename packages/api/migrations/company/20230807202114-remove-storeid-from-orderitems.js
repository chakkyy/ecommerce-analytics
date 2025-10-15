'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('EcommerceOrderItems', 'ecommerceStoreId');
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('EcommerceOrderItems', 'ecommerceStoreId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'EcommerceStores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
