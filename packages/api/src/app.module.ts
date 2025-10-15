import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { UsersInvitesModule } from '@modules/usersInvites/usersInvites.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { CountriesModule } from '@modules/countries/countries.module';
import { SectorsModule } from '@modules/sectors/sectors.module';
import { RolesModule } from '@modules/roles/roles.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { PermissionsRolesModule } from '@modules/permissionsRoles/permissionsRoles.module';
import { UsersRelationshipsModule } from '@modules/usersRelationships/usersRelationships.module';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { AuthModule } from '@modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './models/ecommerce-analytics /user.entity';
import { Company } from './models/ecommerce-analytics /company.entity';
import { Country } from './models/ecommerce-analytics /country.entity';
import { Sector } from './models/ecommerce-analytics /sector.entity';
import { UserInvite } from './models/ecommerce-analytics /usersInvite.entity';
import { Role } from './models/ecommerce-analytics /role.entity';
import { databaseConfig } from '@core/database/database.config';
import { MigrationModule } from './modules/migration/migration.module';
import { CronModule } from './modules/cron/cron.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    QueueModule,
    MigrationModule,
    SequelizeModule.forRoot({
      ...databaseConfig,
      sync: {
        alter: process.env.DB_SYNC === 'true',
        force: process.env.DB_FORCE === 'true',
      },
      models: [User, Company, Country, Sector, UserInvite, Role],
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    UsersInvitesModule,
    CompaniesModule,
    CountriesModule,
    SectorsModule,
    RolesModule,
    PermissionsModule,
    PermissionsRolesModule,
    UsersRelationshipsModule,
    RecipesModule,
    CronModule,
  ],
})
export class AppModule {}
