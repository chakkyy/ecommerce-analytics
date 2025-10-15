'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('EcommerceClientGlobalSegments', {
      fields: ['clientId'],
      type: 'foreign key',
      references: {
        table: 'EcommerceUsers',
        field: 'id',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('EcommerceClientGlobalSegments', 'fk_segments_orders_user');
  },
};
