'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('EcommerceOrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'EcommerceProducts',
        field: 'id',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('EcommerceOrderItems', 'fk_orderitems_product');
  },
};
