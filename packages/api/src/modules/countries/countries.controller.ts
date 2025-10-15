import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiUnauthorizedResponse, ApiOkResponse, ApiCookieAuth } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          name: 'Afghanistan',
          code: '93',
          iso: 'AF',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 2,
          name: 'Albania',
          code: '355',
          iso: 'AL',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 3,
          name: 'Algeria',
          code: '213',
          iso: 'DZ',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 4,
          name: 'American Samoa',
          code: '1-684',
          iso: 'AS',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 5,
          name: 'Andorra',
          code: '376',
          iso: 'AD',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 6,
          name: 'Angola',
          code: '244',
          iso: 'AO',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 7,
          name: 'Anguilla',
          code: '1-264',
          iso: 'AI',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 8,
          name: 'Antarctica',
          code: '672',
          iso: 'AQ',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 9,
          name: 'Antigua and Barbuda',
          code: '1-268',
          iso: 'AG',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
        {
          id: 10,
          name: 'Argentina',
          code: '54',
          iso: 'AR',
          createdAt: '2023-03-14T20:32:57.722Z',
          updatedAt: '2023-03-14T20:32:57.722Z',
        },
      ],
    },
  })
  @Get()
  async findAll() {
    return await this.countriesService.findAll();
  }
}
