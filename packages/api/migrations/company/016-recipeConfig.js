'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RecipeConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      filterTypeDetail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      metricId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Metrics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      chartTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ChartTypes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      filterTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'FilterTypes',
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
    await queryInterface.dropTable('RecipeConfigs');
  },
};
