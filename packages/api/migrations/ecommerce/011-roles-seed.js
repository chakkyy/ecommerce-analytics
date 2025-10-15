'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          label: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: 'Specialist',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: 'Member',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
