'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('EcommerceOrders', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'EcommerceUsers',
        field: 'id',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('EcommerceOrders', 'fk_orders_user');
  },
};
