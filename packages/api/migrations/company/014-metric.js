'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Metrics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      positionX: {
        type: Sequelize.INTEGER,
      },
      positionY: {
        type: Sequelize.INTEGER,
      },
      spanX: {
        type: Sequelize.INTEGER,
      },
      spanY: {
        type: Sequelize.INTEGER,
      },
      dashboardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Dashboards',
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
    await queryInterface.dropTable('Metrics');
  },
};
