'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'ChartTypes',
      [
        {
          id: 1,
          name: 'KPI_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'LINE_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'PIE_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'COLUMNS_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'BARS_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'TABLE_CHART',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ChartTypes', null, {});
  },
};
