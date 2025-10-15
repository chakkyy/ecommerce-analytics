import { Injectable, OnModuleInit } from '@nestjs/common';
import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import { databaseConfig } from '@core/database/database.config';
import * as dotenv from 'dotenv';
import { Company } from '../../models/ecommerce-analytics /company.entity';

dotenv.config();

@Injectable()
export class MigrationService implements OnModuleInit {
  async onModuleInit() {
    await this.runMigrations('ecommerce-analytics ', process.env.DB_NAME);
    const databases = await this.getCompanyDatabases();
    await Promise.all(databases.map(database => this.runMigrations('company', database)));
  }

  async getCompanyDatabases() {
    const sequelize = new Sequelize({ ...databaseConfig, database: process.env.DB_NAME });

    await sequelize.authenticate();

    const [companies] = await sequelize.query(`SELECT * FROM "Companies" where "deletedAt" IS NULL`, {});

    return (companies as Company[]).map(company => company.database);
  }

  runMigrations(scope: 'company' | 'ecommerce-analytics ', database: string) {
    const sequelize = new Sequelize({ ...databaseConfig, database });
    const umzug = new Umzug({
      migrations: {
        glob: `migrations/${scope}/*.js`,
        resolve: ({ name, path, context }) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const migration = require(path);
          return {
            // adjust the parameters Umzug will
            // pass to migration methods when called
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
      },
      logger: console,
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
    });

    return umzug.up();
  }
}
