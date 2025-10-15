'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          target: 'CREATE_AND_CONFIGURE_DASHBOARDS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'CREATE_AND_CONFIGURE_SEGMENTS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'CREATE_AND_CONFIGURE_MARKETING_ACTIONS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'EXECUTE_MARKETING_ACTIONS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'CREATE_USERS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'MANAGE_USERS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'CREATE_BACKUPS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'MANAGE_INTEGRATIONS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          target: 'DELETE_ACCOUNT',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
