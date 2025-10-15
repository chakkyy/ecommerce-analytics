'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Recipes',
      [
        {
          id: 60,
          name: 'USERS_BY_SEGMENT',
          description: 'DESCRIPTION_USERS_BY_SEGMENT',
          category: 'SALES',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'RecipesChartTypes',
      [
        {
          recipeId: 60, // Costos totales
          chartTypeId: 3, // Grafico de torta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'RecipesFilterTypes',
      [
        {
          recipeId: 60, // Costos por transacción
          filterTypeId: 2, // Rango de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Recipes', { id: 60 });
  },
};
