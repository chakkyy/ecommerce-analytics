import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiUnauthorizedResponse, ApiOkResponse, ApiCookieAuth } from '@nestjs/swagger';
import { SectorsService } from './sectors.service';

@Controller('sectors')
export class SectorsController {
  constructor(private sectorsService: SectorsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiOperation({ summary: 'Get all sectors' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          name: 'C-Level',
          createdAt: '2023-03-14T20:32:57.700Z',
          updatedAt: '2023-03-14T20:32:57.700Z',
        },
        {
          id: 2,
          name: 'Sales',
          createdAt: '2023-03-14T20:32:57.700Z',
          updatedAt: '2023-03-14T20:32:57.700Z',
        },
        {
          id: 3,
          name: 'Marketing',
          createdAt: '2023-03-14T20:32:57.700Z',
          updatedAt: '2023-03-14T20:32:57.700Z',
        },
        {
          id: 4,
          name: 'E-commerce',
          createdAt: '2023-03-14T20:32:57.700Z',
          updatedAt: '2023-03-14T20:32:57.700Z',
        },
        {
          id: 5,
          name: 'Finances',
          createdAt: '2023-03-14T20:32:57.700Z',
          updatedAt: '2023-03-14T20:32:57.700Z',
        },
      ],
    },
  })
  @Get()
  async getAllSectors() {
    return await this.sectorsService.findAll();
  }
}
