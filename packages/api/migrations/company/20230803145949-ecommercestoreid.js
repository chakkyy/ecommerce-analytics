'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('EcommerceStores', 'ecommerceStoreId', {
      type: Sequelize.STRING,
    });
  },

  down: async queryInterface => {
    await queryInterface.changeColumn('EcommerceStores', 'ecommerceStoreId', {
      type: Sequelize.INTEGER,
    });
  },
};
