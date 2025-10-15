'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'FilterTypes',
      [
        {
          id: 1,
          name: 'NO_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'TIME_RANGE_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'COSTS_RANGE_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'CATEGORY_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'TIME_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'DATA_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: 'VENDOR_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: 'SEGMENT_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          name: 'TRANSACTION_FILTER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('FilterTypes', null, {});
  },
};
