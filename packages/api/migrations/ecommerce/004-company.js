module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      businessName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      employeesNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      database: {
        type: Sequelize.STRING,
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sectorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sectors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Companies');
  },
};
