'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EcommerceOrders', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      cost: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      shippingCost: {
        type: Sequelize.FLOAT(22, 2),
        defaultValue: 0,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
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
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'EcommerceVendors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('EcommerceOrders');
  },
};
