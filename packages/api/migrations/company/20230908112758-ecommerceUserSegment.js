'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EcommerceUserSegments', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EcommerceUsers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ecommerceConnectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EcommerceConnects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      segmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EcommerceSegments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('EcommerceUserSegments');
  },
};
