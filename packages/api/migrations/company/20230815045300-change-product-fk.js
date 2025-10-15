'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "EcommerceOrderItems" ALTER COLUMN "productId" DROP DEFAULT, ALTER COLUMN "productId" TYPE INTEGER USING NULL;'
    );
  },

  down: async queryInterface => {
    await queryInterface.changeColumn('EcommerceOrderItems', 'productId', {
      type: Sequelize.STRING,
    });
  },
};
