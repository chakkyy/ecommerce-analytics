'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EcommerceCategoryTrees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Assuming name is required
      },
      parentCategoryId: {
        type: Sequelize.INTEGER,
      },
      categoryLevelId: {
        type: Sequelize.INTEGER,
      },

      hasChildren: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      metaTagDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idVtex: {
        type: Sequelize.STRING,
        allowNull: false,
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
      ecommerceConnectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EcommerceConnects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('EcommerceCategoryTrees');
  },
};
