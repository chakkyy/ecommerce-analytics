import { Global, Module, Scope } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ChartType } from '@models/company/chartType.entity';
import { Dashboard } from '@models/company/dashboard.entity';
import { FilterType } from '@models/company/filterType.entity';
import { GlobalSegments } from '@models/company/globalSegments.entity';
import { Metric } from '@models/company/metric.entity';
import { Recipe } from '@models/company/recipe.entity';
import { RecipeConfig } from '@models/company/recipeConfig';
import { RecipesChartType } from '@models/company/recipesChartType.entity';
import { RecipesFilterType } from '@models/company/recipesFilterType.entity';
import { EcommerceCart } from '@models/company/ecommerceCart.entity';
import { EcommerceCartItem } from '@models/company/ecommerceCartItem.entity';
import { EcommerceClientGlobalSegment } from '@models/company/ecommerceClientGlobalSegment.entity';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { EcommerceNewUser } from '@models/company/ecommerceNewUser.entity';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommercePageClicks } from '@models/company/ecommercePageClicks.entity';
import { EcommercePageReview } from '@models/company/ecommercePageReview.entity';
import { EcommercePageViews } from '@models/company/ecommercePageViews.entity';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';
import { EcommerceStore } from '@models/company/ecommerceStore.entity';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';
import { EcommerceVendor } from '@models/company/ecommerceVendor.entity';
import { EcommerceOrderRule } from '@models/company/ecommerceOrderRules.entity';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { databaseConfig } from '../../core/database/database.config';
import { MigrationModule } from '../migration/migration.module';
import { JwtService } from '@nestjs/jwt';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { EcommerceBrand } from '@models/company/ecommerceBrand.entity';
import { EcommerceCategoryTree } from '@models/company/ecommerceCategoryTree.entity';

export interface SequelizeInstance extends Sequelize {
  models: {
    Dashboard: typeof Dashboard;
    FilterType: typeof FilterType;
    GlobalSegments: typeof GlobalSegments;
    Metric: typeof Metric;
    Recipe: typeof Recipe;
    RecipeConfig: typeof RecipeConfig;
    RecipesChartType: typeof RecipesChartType;
    RecipesFilterType: typeof RecipesFilterType;
    ChartType: typeof ChartType;
    EcommerceCart: typeof EcommerceCart;
    EcommerceCartItem: typeof EcommerceCartItem;
    EcommerceClientGlobalSegment: typeof EcommerceClientGlobalSegment;
    EcommerceConnect: typeof EcommerceConnect;
    EcommerceCredential: typeof EcommerceCredential;
    EcommerceNewUser: typeof EcommerceNewUser;
    EcommerceOrder: typeof EcommerceOrder;
    EcommerceOrderItem: typeof EcommerceOrderItem;
    EcommercePageClicks: typeof EcommercePageClicks;
    EcommercePageReview: typeof EcommercePageReview;
    EcommercePageViews: typeof EcommercePageViews;
    EcommerceProduct: typeof EcommerceProduct;
    EcommerceSegment: typeof EcommerceSegment;
    EcommerceStore: typeof EcommerceStore;
    EcommerceUser: typeof EcommerceUser;
    EcommerceVendor: typeof EcommerceVendor;
    EcommerceOrderRule: typeof EcommerceOrderRule;
    EcommerceUserSegment: typeof EcommerceUserSegment;
    EcommerceBrand: typeof EcommerceBrand;
    EcommerceCategoryTree: typeof EcommerceCategoryTree;
  };
}

export interface TenantInstance {
  connection: SequelizeInstance;
  timeout: NodeJS.Timeout;
  database: string;
}

const TTL = 60 * 60 * 12; // 12 hours

const cache = new Map<string, TenantInstance>();

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

export const clearCache = async (database: string): Promise<void> => {
  const cached = cache.get(database);
  if (cached) {
    await cached.connection.close();
    cache.delete(database);
  }
};

export const getConnection = async (options: Partial<SequelizeOptions>): Promise<SequelizeInstance> => {
  const connection = new Sequelize({
    repositoryMode: true,
    ...databaseConfig,
    ...options,
    dialectOptions: {
      connectTimeout: 15000, // 15 seconds
    },
  }) as SequelizeInstance;

  connection.addModels([
    Dashboard,
    FilterType,
    GlobalSegments,
    Metric,
    Recipe,
    RecipeConfig,
    RecipesChartType,
    RecipesFilterType,
    ChartType,
    EcommerceCart,
    EcommerceCartItem,
    EcommerceClientGlobalSegment,
    EcommerceConnect,
    EcommerceCredential,
    EcommerceNewUser,
    EcommerceOrder,
    EcommerceOrderItem,
    EcommercePageClicks,
    EcommercePageReview,
    EcommercePageViews,
    EcommerceProduct,
    EcommerceSegment,
    EcommerceStore,
    EcommerceUser,
    EcommerceVendor,
    EcommerceOrderRule,
    EcommerceUserSegment,
    EcommerceBrand,
    EcommerceCategoryTree,
  ]);

  await connection.authenticate();

  return connection;
};

export const getCompanyDatabase = async (database: string, force = false) => {
  const cached = cache.get(database);
  let connection: SequelizeInstance;

  if (cached?.connection && !force) {
    clearTimeout(cached.timeout);
    connection = cached.connection;
  } else {
    connection = await getConnection({ database });
  }

  cache.set(database, {
    timeout: setTimeout(() => {
      clearCache(database);
    }, TTL),
    connection,
    database,
  });

  return cache.get(database);
};

@Global()
@Module({
  imports: [MigrationModule],
  providers: [
    JwtService,
    TenantService,
    {
      provide: TENANT_CONNECTION,
      useFactory: async (request: Request, jwtService: JwtService) => {
        const decodedToken = jwtService.decode(request.cookies['auth-token']) as {
          selectedCompany: Company;
        }; // TODO: Move this type to a common interface

        if (!decodedToken?.selectedCompany?.database) return null;

        const database = await getCompanyDatabase(decodedToken?.selectedCompany?.database);

        return database;
      },
      scope: Scope.REQUEST,
      inject: [REQUEST, JwtService],
    },
  ],
  exports: [TenantService, TENANT_CONNECTION],
})
export class TenantModule {}
