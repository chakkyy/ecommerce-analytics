'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "EcommerceOrderItems" ALTER COLUMN "orderId" DROP DEFAULT, ALTER COLUMN "orderId" TYPE INTEGER USING NULL;'
    );
  },

  down: async queryInterface => {
    await queryInterface.changeColumn('EcommerceOrderItems', 'orderId', {
      type: Sequelize.STRING,
    });
  },
};
