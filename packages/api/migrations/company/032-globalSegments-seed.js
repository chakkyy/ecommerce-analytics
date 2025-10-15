'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'GlobalSegments',
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'CHAMPIONS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'BIG_SPENDERS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'FREQUENT_SHOPPERS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'OCCASIONAL_SHOPPERS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'NEW_CUSTOMERS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'ASLEEP_CUSTOMERS',
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'INACTIVE_CUSTOMERS',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('GlobalSegments', null, {});
  },
};
