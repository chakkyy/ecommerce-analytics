'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EcommerceUploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      template: {
        type: Sequelize.ENUM('stores', 'sales', 'customers', 'products'), // Replace with the actual values of TemplateType enum
        allowNull: false,
      },
      totalLines: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      processedLines: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      errors: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      ecommerceConnectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('EcommerceUploads');
  },
};
