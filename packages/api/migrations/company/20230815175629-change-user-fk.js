'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "EcommerceOrders" ALTER COLUMN "userId" DROP DEFAULT, ALTER COLUMN "userId" TYPE INTEGER USING NULL;'
    );
  },

  down: async queryInterface => {
    await queryInterface.changeColumn('EcommerceOrders', 'userId', {
      type: Sequelize.STRING,
    });
  },
};
