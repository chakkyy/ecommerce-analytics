'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Sectors',
      [
        {
          name: 'C-Level',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sales',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Marketing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'E-commerce',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Finances',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Sectors', null, {});
  },
};
