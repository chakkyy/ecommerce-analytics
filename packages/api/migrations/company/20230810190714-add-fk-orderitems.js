'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('EcommerceOrderItems', {
      fields: ['orderId'],
      type: 'foreign key',
      references: {
        table: 'EcommerceOrders',
        field: 'id',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('EcommerceOrderItems', 'fk_orderitems_order');
  },
};
