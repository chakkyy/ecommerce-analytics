'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EcommercePageViews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      page: {
        type: Sequelize.STRING,
      },
      referer: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      isMobile: {
        type: Sequelize.BOOLEAN,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      visitorId: {
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('EcommercePageViews');
  },
};
