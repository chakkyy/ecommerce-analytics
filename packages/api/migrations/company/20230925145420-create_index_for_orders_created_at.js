'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('EcommerceOrders', ['createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('EcommerceOrders', ['createdAt']);
  },
};
