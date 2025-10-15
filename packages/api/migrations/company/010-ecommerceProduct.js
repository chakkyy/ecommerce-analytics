'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EcommerceProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      sku: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      discount: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      discountPrice: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      cost: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      productId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      type: {
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
      ecommerceStoreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EcommerceStores',
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
    await queryInterface.dropTable('EcommerceProducts');
  },
};
