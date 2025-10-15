'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "EcommerceClientGlobalSegments" ALTER COLUMN "clientId" DROP DEFAULT, ALTER COLUMN "clientId" TYPE INTEGER USING NULL;'
    );
  },

  down: async queryInterface => {
    await queryInterface.changeColumn('EcommerceClientGlobalSegments', 'clientId', {
      type: Sequelize.STRING,
    });
  },
};
