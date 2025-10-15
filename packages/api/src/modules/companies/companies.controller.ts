import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Body,
  Req,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
  Get,
  Param,
  Res,
  Query,
  Inject,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyDto } from './dto/company.dto';
import { EcommerceCredentialDto } from '@modules/ecommerceCredentials/dto/ecommerceCredential.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import axios from 'axios';
import { Sequelize, QueryTypes, Op } from 'sequelize';
import { sub, format, parse, isValid } from 'date-fns';
import { ApiResponseForbidden, ApiResponseInternalServerError, ApiResponseUnauthorized } from '@utils/apiDocs';
import { User } from '@models/ecommerce-analytics /user.entity';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { Company } from '@models/ecommerce-analytics /company.entity';
import { getStartAndEndDates } from '@utils/vtex';
import { formattedCurrentDate, formattedNDaysAgo } from '@utils/date';
import { fn, col } from 'sequelize';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import EcommerceSegments, { DEFAULT_SEGMENTATION_DAYS } from '@services/ecommerce/segments/segments';
import DashboardService from '@services/dashboards/dashboard';
import EcommerceSales from '@services/ecommerce/sales/sales';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';
import { InjectConnection } from '@nestjs/sequelize';
import { FileUploadService } from '../upload/upload.service';
import { Request } from 'express';
import { initialConfigsStore, initialMetricsStore } from '@utils/createInitialMetrics';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommerceStore } from '@models/company/ecommerceStore.entity';
import { syncVtex } from '@lib/vtex';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';
import { EcommerceNewUser } from '@models/company/ecommerceNewUser.entity';
import { newUsersQueryByEcommerceConnectId, allNewUsersQuery } from '@services/utils/newUserQuery';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(
    private companiesService: CompaniesService,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
    private segmentsService: EcommerceSegments,
    private readonly dashboardService: DashboardService,
    private readonly salesService: EcommerceSales,
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private fileUploadService: FileUploadService,
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance,
    @InjectQueue('updateOrders') private updateOrdersQueue: Queue,
    @InjectQueue('uploadFiles') private uploadFilesQueue: Queue
  ) {}

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        businessName: 'Test company',
        countryId: 1,
        sectorId: 1,
        employeesNumber: '100',
        userId: 1,
        updatedAt: '2023-03-14T21:33:39.463Z',
        createdAt: '2023-03-14T21:33:39.463Z',
        logo: null,
        deletedAt: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        statusCode: 400,
        message: ['<field> should not be empty'],
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({
    schema: {
      description: 'Array of email addresses',
      example: {
        businessName: 'Test company',
        countryId: 1,
        sectorId: 1,
        employeesNumber: 100,
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Post()
  async create(@Body() company: CompanyDto, @Req() request, @Res({ passthrough: true }) response: Response) {
    const decodedToken = request.res.cookie();
    const user = decodedToken.req.user;
    const payload: any = { ...company };
    payload.userId = user.id;
    const newCompany = await this.companiesService.create(payload);

    const updatedUser: User & { selectedCompany?: Company } = await this.userService.findOneByEmail(user.email);
    updatedUser.selectedCompany = newCompany;

    const newToken = await this.authService.generateToken(updatedUser);
    response.clearCookie('auth-token');
    response.cookie('auth-token', newToken, {
      httpOnly: true,
    });
    return newCompany;
  }

  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a new logo' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        businessName: 'test',
        employeesNumber: '10',
        logo: '<url_logo>',
        createdAt: '2023-03-14T21:31:01.952Z',
        updatedAt: '2023-03-15T14:09:51.583Z',
        deletedAt: null,
        userId: 1,
        countryId: 1,
        sectorId: 1,
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'image',
          format: 'binary',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    schema: {
      example: {
        statusCode: 400,
        message: "'file' field should not be empty",
        error: 'Bad Request',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post(':companyId/logo/upload')
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request, @Param('companyId') companyId: number) {
    const _file = file || request.body.file;
    if (!_file)
      throw new BadRequestException({
        statusCode: 400,
        message: "'file' field should not be empty",
        error: 'Bad Request',
      });
    return this.companiesService.saveLogo(_file, companyId);
  }

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Connects to VTEX and saves a new set of credentials',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: [
        {
          id: 1,
          ecommerceKey: 'VTEX-1',
          keyType: 'public_key',
          keyValue: 'vtexappkey-ecommerce-analytics partnerpe-VGHFEI',
          createdAt: '2023-03-14T17:42:42.226Z',
          updatedAt: '2023-03-14T17:42:42.226Z',
          deletedAt: null,
          companyId: null,
        },
        {
          id: 2,
          ecommerceKey: 'VTEX-1',
          keyType: 'secret_key',
          keyValue:
            'ZTOQLZRBTBPMELCDHASJHODKAJBQGEBLQNUWUIAFMNVRNFRERWCSZNGIIMCJYVPMENGPCDJHTFAQFKRDOQCGUILLVPFKREEVHUKJFZKFIXNUWLTYEJZXDKGLEJDOTVMK',
          createdAt: '2023-03-14T17:42:42.226Z',
          updatedAt: '2023-03-14T17:42:42.226Z',
          deletedAt: null,
          companyId: null,
        },
        {
          id: 3,
          ecommerceKey: 'VTEX-1',
          keyType: 'url',
          keyValue: 'https://ecommerce-analytics partnerpe.myvtex.com',
          createdAt: '2023-03-14T17:42:42.226Z',
          updatedAt: '2023-03-14T17:42:42.226Z',
          deletedAt: null,
          companyId: null,
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    schema: {
      example: {
        statusCode: 400,
        message: 'Bad Request',
      },
    },
  })
  @ApiBody({
    schema: {
      example: {
        credentials: [
          {
            ecommerceKey: 'ecommerce_key',
            keyType: 'public_key',
            keyValue: 'value',
          },
          {
            ecommerceKey: 'ecommerce_key',
            keyType: 'secret_key',
            keyValue: 'value',
          },
          {
            ecommerceKey: 'ecommerce_key',
            keyType: 'url',
            keyValue: 'https://example.com',
          },
        ],
        strategy: 'VTEX or STORE',
      },
    },
  })
  @Post('/connectEcommerce')
  async connectEcommerce(
    @Body() credentials: { credentials: EcommerceCredentialDto[]; strategy: string },
    @Req() request,
    @Query('template') template
  ) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const user = this.jwtService.decode(token) as User & { selectedCompany?: Company };
      const ecommerceConnectRepository = this.tenantInstance.connection.getRepository(EcommerceConnect);
      const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

      if (credentials.strategy === 'STORE') {
        try {
          const transaction = await this.tenantInstance.connection.transaction(async t => {
            const ecommerceConnect = await ecommerceConnectRepository.create(
              { name: 'tiendaFisica', key: 'tiendaFisica', strategy: 'store' },
              {
                transaction: t,
              }
            );
            if (template === 'ecommerce') {
              await this.dashboardService.createEmptyDashboard({
                name: 'Tienda física',
                ecommerceConnectId: ecommerceConnect.id,
                creatorId: user.id,
                transaction: t,
              });
            } else {
              await this.dashboardService.createEmptyDashboard({
                name: 'Tienda física',
                ecommerceConnectId: ecommerceConnect.id,
                creatorId: user.id,
                transaction: t,
                initialMetrics: initialMetricsStore,
                initialRecipeConfigs: initialConfigsStore,
              });
            }

            return ecommerceConnect;
          });
          return transaction;
        } catch (error) {}
      }

      if (credentials.strategy === 'VTEX') {
        const publicKey = credentials.credentials.find(el => el.keyType === 'public_key').keyValue;
        const secretKey = credentials.credentials.find(el => el.keyType === 'secret_key').keyValue;
        const url = credentials.credentials.find(el => el.keyType === 'url').keyValue;

        const payload = JSON.stringify({
          appkey: publicKey,
          apptoken: secretKey,
        });

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${url}/api/vtexid/apptoken/login`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: payload,
        };

        const { data } = await axios(config);

        if (data.authStatus == 'Success' && data.token) {
          try {
            const ecommerceConnect = await this.tenantInstance.connection.transaction(async t => {
              const ecommerceConnect = await ecommerceConnectRepository.create(
                {
                  name: 'Dashboard demo',
                  key: url,
                  strategy: 'vtex',
                },
                {
                  transaction: t,
                }
              );
              const credentialsWithConnectId = credentials.credentials.map(
                (
                  credential: EcommerceCredentialDto & {
                    ecommerceConnectId: number;
                  }
                ) => {
                  credential.ecommerceConnectId = ecommerceConnect.id;
                  return credential;
                }
              );
              const ecommerceCredentials = await ecommerceCredentialRepository.bulkCreate(credentialsWithConnectId, {
                transaction: t,
              });
              await this.dashboardService.createEmptyDashboard({
                name: url,
                ecommerceConnectId: ecommerceConnect.id,
                creatorId: user.id,
                transaction: t,
              });
              ecommerceConnect.ecommerceCredentials = ecommerceCredentials;
              return ecommerceConnect;
            });
            if (process.env.FEATURE_FLAG_CRONJOBS === 'true') {
              const { endDate, startDate } = getStartAndEndDates(+process.env.VTEX_DAYS_TO_SYNC_AT_CREATE || 60);

              syncVtex({
                ecommerceConnectId: ecommerceConnect.id,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                tenant: this.tenantInstance,
                queue: this.updateOrdersQueue,
              });
            }
            return ecommerceConnect;
          } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
          }
        } else {
          throw new BadRequestException();
        }
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Get dashboard data',
  })
  @ApiOkResponse({
    schema: {
      example: {
        id: 1,
        name: 'ecommerce-analytics  Partner',
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Get('/dashboards/:id')
  async getDashboardData(@Param('id') id: number, @Query('storeList') storeList, @Req() request) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const user = this.jwtService.decode(token) as User & { selectedCompany?: Company };
      if (!user) {
        throw new UnauthorizedException();
      }

      if (!user.companies.some(company => company.id === +user.selectedCompany?.id)) {
        throw new ForbiddenException();
      }

      const dashboardData = await this.companiesService.getDashboardConfig(+id);
      if (!dashboardData) {
        throw new NotFoundException();
      }
      return dashboardData;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Get dashboard data',
  })
  @ApiOkResponse({
    schema: {
      example: {
        id: 1,
        name: 'ecommerce-analytics  Partner',
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Get('/dashboards')
  async getDashboards(@Req() request) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const user = this.jwtService.decode(token) as User & { selectedCompany?: Company };
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!user.companies.some(company => company.id === +user.selectedCompany?.id)) {
        throw new ForbiddenException();
      }
      const dashboardData = await this.companiesService.getDashboards();
      if (!dashboardData) {
        throw new NotFoundException();
      }
      return dashboardData;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Get dashboard paginated orders',
  })
  @ApiOkResponse({
    schema: {
      example: [
        {
          id: 1,
          total: '5000.00',
          cost: null,
          orderId: '123',
          status: 'handling',
          ecommerceConnectId: 17,
          segmentId: null,
          vendorId: null,
          userId: null,
          createdAt: '2023-04-29T23:28:39.000Z',
          updatedAt: '2023-04-29T23:30:33.000Z',
          deletedAt: null,
        },
        `// More items depending on pageSize value`,
      ],
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Period start datetime in ISO standard. Default: 60 days ago',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Period end datetime in ISO standard. Default: current date',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number of the results. Default: 1' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Results quantity per page. Default: 15' })
  @Get('/dashboards/:id/orders')
  async getDashboardOrders(@Param('id') id: number, @Req() request) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const user = this.jwtService.decode(token) as User & { selectedCompany?: Company };
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!user.companies.some(company => company.id === +user.selectedCompany?.id)) {
        throw new ForbiddenException();
      }
      const dashboardConfig = await this.companiesService.getDashboardConfig(+id);
      const ecommerceConnectId = dashboardConfig?.ecommerceConnectId;
      const {
        startDate = formattedNDaysAgo(60),
        endDate = formattedCurrentDate(),
        page = 1,
        pageSize = 15,
      } = request.query;
      const ordersData = await this.salesService.orders({
        startDate,
        endDate,
        ecommerceConnectId,
        page,
        pageSize,
      });
      if (!ordersData) {
        throw new NotFoundException();
      }
      return ordersData;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Get the current company segments list',
  })
  @ApiOkResponse({
    schema: {
      example: [
        {
          id: 1,
          name: {
            es: 'Segment name (in spanish)',
            pt: 'Segment name (in portuguese)',
            en: 'Segment name',
          },
          description: {
            es: 'Segment description (in spanish)',
            pt: 'Segment description (in portuguese)',
            en: 'Segment description',
          },
        },
        `..more items depending on active segments`,
      ],
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Get('/segments/')
  async getSegments() {
    try {
      const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
      const segments = await ecommerceSegmentRepository.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']],
        raw: true,
      });
      return segments;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Get segment users and data`,
  })
  @ApiOkResponse({
    schema: {
      example: {
        users: [
          {
            email: `Segment's user email`,
            phone: `Segment's user phone`,
            fullName: `Segment's user full name`,
          },
          `more items depending on the segment's users quantity (maximum 10 per page)`,
        ],
        count: 0,
        segment: {
          name: {
            es: 'Segment name (in spanish)',
            pt: 'Segment name (in portuguese)',
            en: 'Segment name',
          },
          description: {
            es: 'Segment description (in spanish)',
            pt: 'Segment description (in portuguese)',
            en: 'Segment description',
          },
        },
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @ApiParam({
    name: 'segmentId',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page (Default: 1)',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/segments/:segmentId/:page?')
  async getUsers(@Param('segmentId') segmentId: number, @Param('page') page = 1) {
    try {
      const limit = 10;

      const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);
      const ecommerceUserRepository = this.tenantInstance.connection.getRepository(EcommerceUser);
      const EcommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
      const count = await ecommerceUserSegmentRepository.count({
        where: { segmentId },
        include: [
          {
            model: ecommerceUserRepository,
            attributes: ['email', 'phone', 'fullName'],
            where: {
              [Op.or]: [{ email: { [Op.not]: null } }, { phone: { [Op.not]: null } }],
            },
            required: true,
          },
        ],
      });
      const segment = await EcommerceSegmentRepository.findOne({
        attributes: ['name', 'description'],
        where: { id: segmentId },
      });
      const users = await ecommerceUserSegmentRepository.findAll({
        attributes: [],
        include: [
          {
            model: ecommerceUserRepository,
            attributes: ['email', 'phone', 'fullName'],
            where: {
              [Op.or]: [{ email: { [Op.not]: null } }, { phone: { [Op.not]: null } }],
            },
            required: true,
          },
        ],
        where: { segmentId },
        limit,
        offset: (page - 1) * limit,
        raw: true,
        nest: true,
      });

      const formattedUsers = users.map(wrapper => wrapper.user);
      return {
        users: formattedUsers,
        count,
        segment,
      };
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Get segment users CSV`,
  })
  @ApiOkResponse({
    schema: {
      example: `data:text/csv;charset=utf-8,Customer%20name,Email,Phone,Last%20order%0A,(...users data CSV content)`,
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Get('/segments-csv/:segmentId')
  async getUsersCSV(@Param('segmentId') segmentId: number) {
    try {
      const ecommerceConnectRepository = this.tenantInstance.connection.getRepository(EcommerceConnect);

      const ecommerceList = await ecommerceConnectRepository.findAll({
        attributes: ['id'],
        raw: true,
      });
      const [users] = await this.tenantInstance.connection.query(
        `
          SELECT DISTINCT
          "EcommerceUser"."id",
          "EcommerceUser"."email" AS "email",
          "EcommerceUser"."phone",
          "EcommerceUser"."fullName",
          TO_CHAR((SELECT MAX("createdAt") FROM "EcommerceOrders" WHERE "userId" = "EcommerceUser"."id"), 'YYYY-MM-DD') AS "lastPurchaseDate"
        FROM
          "EcommerceUsers" AS "EcommerceUser"
          INNER JOIN "EcommerceUserSegments" AS "segment" ON "EcommerceUser"."id" = "segment"."userId"
        WHERE
          "segment"."ecommerceConnectId" IN (:ecommerceList)
          AND "segment"."segmentId" = :segmentId
          AND "EcommerceUser"."deletedAt" IS NULL
          AND "EcommerceUser"."ecommerceConnectId" IN (:ecommerceList)
        GROUP BY
        "EcommerceUser"."id",
          "email",
          "phone",
          "fullName";
        `,
        {
          raw: true,
          replacements: {
            segmentId,
            ecommerceList: ecommerceList.map(ecommerce => ecommerce.id),
          },
        }
      );

      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Customer name,Email,Phone,Last order\n';

      users?.forEach((item: EcommerceUser & { lastPurchaseDate: string }) => {
        const row = `${item.fullName},${item.email},${item.phone},${item.lastPurchaseDate || ''}\n`;
        csvContent += row;
      });
      const encodedURI = encodeURI(csvContent);
      return encodedURI;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Get company stores`,
  })
  @ApiOkResponse({
    schema: {
      example: [
        {
          ecommerceStoreId: `Store id`,
          name: `Store name`,
          id: 0,
        },
        `...more items depending on the company stores`,
      ],
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Get('/stores/:ecommerceConnectId')
  async getStores(
    @Param('ecommerceConnectId') ecommerceConnectId: number,
    @Req()
    request
  ) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const ecommerceStoreRepository = this.tenantInstance.connection.getRepository(EcommerceStore);

      this.jwtService.decode(token) as User & { selectedCompany?: Company };

      const stores = await ecommerceStoreRepository.findAll({
        attributes: [[fn('DISTINCT', col('ecommerceStoreId')), 'ecommerceStoreId'], 'name', 'id'],
        where: { ecommerceConnectId },
        order: [['name', 'ASC']],
      });
      return stores;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: `Upload CSV data`,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'base64',
          description: '.CSV or .ZIP file to upload',
        },
        template: {
          type: 'string',
          description: 'File template ("sales", "products", "stores", or "customers")',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'File is being processed',
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('/stores/upload-csv/:ecommerceConnectId')
  async uploadStoreCSVData(
    @UploadedFile() file: Express.Multer.File,
    @Param('ecommerceConnectId') ecommerceConnectId: number,
    @Req() request: Request
  ) {
    try {
      const TEXT_CSV = 'text/csv';
      const ZIP = 'application/zip';
      const database = (request.user as { selectedCompany: Company }).selectedCompany.database;

      const filename = `uploads/${new Date().getTime()}-${file.originalname}`;
      // only accept csv and zip files
      if (![TEXT_CSV, ZIP].includes(file.mimetype)) {
        throw new BadRequestException('Invalid file type only csv and zip files are allowed');
      }
      if (!request.body.template) throw new BadRequestException('Missing file template');

      await this.fileUploadService.uploadFile(file.buffer, filename);

      await this.uploadFilesQueue.add(
        {
          filename,
          database,
          ecommerceConnectId,
          template: request.body.template,
          zip: file.mimetype === ZIP,
        },
        {
          attempts: 0,
        }
      );

      return {
        message: 'File is being processed',
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Get metric data',
  })
  @ApiOkResponse({
    schema: {
      example: {
        id: 0,
        title: 'Metric title',
        positionX: 0,
        positionY: 0,
        spanX: 2,
        spanY: 1,
        dashboardId: 1,
        createdAt: '2023-08-02T21:36:55.863Z',
        updatedAt: '2023-08-02T21:36:55.863Z',
        deletedAt: null,
        recipeConfig: {
          id: 1,
          title: 'Metric title',
          filterTypeDetail: '1_MONTH',
          metricId: 1,
          recipeId: 55,
          chartTypeId: 1,
          filterTypeId: 2,
          createdAt: '2023-08-02T21:36:55.870Z',
          updatedAt: '2023-08-02T21:36:55.870Z',
          deletedAt: null,
          chartType: {
            id: 1,
            name: 'KPI_CHART',
          },
          filterType: {
            id: 2,
            name: 'TIME_RANGE_FILTER',
          },
          recipe: {
            id: 55,
            name: 'STORE_ORDERS_TOTAL_NET',
            description: 'DESCRIPTION_STORE_ORDERS_TOTAL',
            category: 'SALES',
          },
        },
        dashboard: {
          ecommerceConnectId: 1,
        },
        value: null,
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'storeList',
    required: false,
    type: String,
    description: 'Stores id list who use the metric. Default: all stores (*)',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: Number,
    description: 'Period start datetime in integers. Default: 60 days ago',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: Number,
    description: 'Period start datetime in integers. Default: current date',
  })
  @Get('/dashboards/metrics/:metricId')
  async getMetricData(
    @Param('metricId') metricId: number,
    @Query('storeList') storeList: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Req() request
  ) {
    try {
      const token = request.cookies['auth-token'] || request.headers['auth-token'];
      const user = this.jwtService.decode(token) as User & { selectedCompany?: Company };
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!user.companies.some(company => company.id === +user.selectedCompany?.id)) {
        throw new ForbiddenException();
      }
      const dashboardData = await this.companiesService.getDashboardData(metricId, storeList, startDate, endDate);
      if (!dashboardData) {
        throw new NotFoundException();
      }
      return dashboardData;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Start segmentation process for a company`,
  })
  @ApiOkResponse({
    schema: {
      example: {
        status: 200,
        message: 'Segments created successfully',
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @Post('/segmentate/:ecommerceConnectId')
  async generateSegment(@Param('ecommerceConnectId') ecommerceConnectId: number) {
    const startDate = new Date();
    const SEGMENTATION_DAYS = DEFAULT_SEGMENTATION_DAYS;
    startDate.setDate(startDate.getDate() - SEGMENTATION_DAYS);
    startDate.setUTCHours(0, 0, 0, 0); // Establece la hora en UTC
    const utcStartDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
        startDate.getUTCHours(),
        startDate.getUTCMinutes(),
        startDate.getUTCSeconds(),
        startDate.getUTCMilliseconds()
      )
    );
    const endDate = new Date();
    console.log('Running segmentation for:', ecommerceConnectId);
    const ecommerceSegments = new EcommerceSegments({
      connection: this.tenantInstance.connection,
    } as TenantInstance);

    console.log('database', this.tenantInstance.database);

    const result = await ecommerceSegments.generateAndSaveSegments({
      ecommerceConnectId,
      startDate: utcStartDate,
      endDate,
    });
    console.log('Finished segmentation:', result);
    return result;
  }

  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get VTEX orders' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/vtex-orders/:ecommerceConnectId')
  // get start date and end date from query params
  async getVtexOrders(
    @Param('ecommerceConnectId') ecommerceConnectId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    let startDateObj: Date;
    let endDateObj: Date;

    // Validate and parse start date
    if (startDate) {
      startDateObj = parse(startDate, 'yyyy-MM-dd', new Date());
      if (!isValid(startDateObj)) {
        throw new Error('Invalid start date format. Please use the format yyyy-MM-dd.');
      }
    } else {
      startDateObj = new Date();
      startDateObj.setMonth(startDateObj.getMonth() - 1);
    }
    startDateObj.setUTCHours(0, 0, 0, 0);

    // Validate and parse end date
    if (endDate) {
      endDateObj = parse(endDate, 'yyyy-MM-dd', new Date());
      if (!isValid(endDateObj)) {
        throw new Error('Invalid end date format. Please use the format yyyy-MM-dd.');
      }
    } else {
      endDateObj = new Date();
    }
    endDateObj.setUTCHours(23, 59, 59, 999);

    console.log(
      'Running orders sync for:',
      ecommerceConnectId,
      'from',
      format(startDateObj, 'yyyy-MM-dd'),
      'to',
      format(endDateObj, 'yyyy-MM-dd')
    );

    syncVtex({
      ecommerceConnectId,
      startDate: startDateObj,
      endDate: endDateObj,
      tenant: this.tenantInstance,
      queue: this.updateOrdersQueue,
    });

    return {
      message: 'Orders sync started',
      startDate: format(startDateObj, 'yyyy-MM-dd'),
      endDate: format(endDateObj, 'yyyy-MM-dd'),
    };
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Get paginated new users by company`,
  })
  @ApiOkResponse({
    schema: {
      example: {
        users: ['...new users data (per page)'],
        count: 0,
      },
    },
  })
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'ecommerceConnectId',
    required: true,
    type: Number,
    example: 0,
    description: 'Company id (Default: 0, retrieves all companies)',
  })
  @ApiParam({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
    description: 'Page (Default: 1)',
  })
  @Get('/get-new-users/:page?/:ecommerceConnectId?/')
  async getByPage(@Param('ecommerceConnectId') ecommerceConnectId = 0, @Param('page') page = 1) {
    try {
      const limit = 10;
      const ecommerceNewUserRepository = this.tenantInstance.connection.getRepository(EcommerceNewUser);
      const ecommerceUserRepository = this.tenantInstance.connection.getRepository(EcommerceUser);

      const countQuery: any = {};
      const newUsersQuery: any = {
        attributes: [],
        include: [
          {
            model: ecommerceUserRepository,
            attributes: ['email', 'phone', 'fullName'],
            where: {
              [Op.or]: [{ email: { [Op.not]: null } }, { phone: { [Op.not]: null } }],
            },
            required: true,
          },
        ],
        limit,
        offset: (page - 1) * limit,
        raw: true,
        nest: true,
      };

      if (Number(ecommerceConnectId) !== 0) {
        countQuery.where = {
          ecommerceConnectId: Number(ecommerceConnectId),
        };
        newUsersQuery.where = { ecommerceConnectId: Number(ecommerceConnectId) };
      }

      const count = await ecommerceNewUserRepository.count({
        ...countQuery,
        include: [
          {
            model: ecommerceUserRepository,
            attributes: ['email', 'phone', 'fullName'],
            where: {
              [Op.or]: [{ email: { [Op.not]: null } }, { phone: { [Op.not]: null } }],
            },
            required: true,
          },
        ],
      });
      const newUsers = await ecommerceNewUserRepository.findAll(newUsersQuery);

      const formattedUsers = newUsers.map(wrapper => wrapper.user);
      return {
        users: formattedUsers,
        count,
      };
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: `Generate new users by company`,
  })
  /*
  TODO: Document response when finished
  @ApiOkResponse({
    schema: {
      example: {},
    },
  })
  */
  @ApiResponseUnauthorized()
  @ApiResponseForbidden()
  @ApiResponseInternalServerError()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'ecommerceConnectId',
    required: true,
    type: Number,
    example: 0,
    description: 'Company id (Default: 0)',
  })
  @Post('/generate-new-users/:ecommerceConnectId?')
  async generateNewUsers(@Param('ecommerceConnectId') ecommerceConnectId = 0) {
    try {
      const ecommerceNewUserRepository = this.tenantInstance.connection.getRepository(EcommerceNewUser);

      const startDateMain = new Date();
      // TODO: Eventually replace 365 with default segmentation period
      const endDateMain = sub(startDateMain, { days: 365 });
      const startDateJoin = sub(endDateMain, { minutes: 1 });
      const endDateJoin = sub(startDateJoin, { days: 365 });
      const destroyQuery = { where: {} };
      if (ecommerceConnectId !== 0) {
        destroyQuery.where = { ecommerceConnectId: Number(ecommerceConnectId) };
      }

      await ecommerceNewUserRepository.destroy(destroyQuery);
      let newUsers: Array<{ userId: number; ecommerceConnectId: number }> = [];

      if (ecommerceConnectId !== 0) {
        newUsers = await this.tenantInstance.connection.query(newUsersQueryByEcommerceConnectId, {
          raw: true,
          type: QueryTypes.SELECT,
          replacements: {
            ecommerceConnectId,
            startDateMain: format(startDateMain, 'yyyy-MM-dd'),
            endDateMain: format(endDateMain, 'yyyy-MM-dd'),
            startDateJoin: format(startDateJoin, 'yyyy-MM-dd'),
            endDateJoin: format(endDateJoin, 'yyyy-MM-dd'),
          },
        });
      } else {
        newUsers = await this.tenantInstance.connection.query(allNewUsersQuery, {
          raw: true,
          type: QueryTypes.SELECT,
          replacements: {
            startDateMain: format(startDateMain, 'yyyy-MM-dd'),
            endDateMain: format(endDateMain, 'yyyy-MM-dd'),
            startDateJoin: format(startDateJoin, 'yyyy-MM-dd'),
            endDateJoin: format(endDateJoin, 'yyyy-MM-dd'),
          },
        });
      }

      if (newUsers.length) {
        await ecommerceNewUserRepository.bulkCreate(newUsers);
        if (ecommerceConnectId !== 0) {
          console.log(
            `Finishing creating new users for ecommerceId: ${ecommerceConnectId}, database: ${this.tenantInstance.connection.config.database}`
          );
        } else {
          console.log(
            `Finishing creating new users for all ecommerces, database: ${this.tenantInstance.connection.config.database}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Error generating new users table: ${error}, database: ${this.tenantInstance.connection.config.database}`
      );
    }
  }
}
