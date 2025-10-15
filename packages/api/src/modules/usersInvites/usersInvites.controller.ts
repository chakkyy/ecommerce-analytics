import { AuthGuard } from '@nestjs/passport';
import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common';
import { UsersInvitesService } from './usersInvites.service';
import { UserInvitesDto } from './dto/userInvites.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundException, GoneException } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('usersInvites')
@ApiTags('Users')
export class UsersInvitesController {
  constructor(private usersInvitesService: UsersInvitesService) {}

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create user invites' })
  @ApiOkResponse({
    status: 201,
    schema: {
      example: [
        {
          id: 1,
          email: 'email@domain.com',
          companyId: null,
          token: 'bV3TRttCQSVvK0g7',
          createdAt: '2023-03-14T21:22:07.769Z',
          updatedAt: '2023-03-14T21:22:07.769Z',
          deletedAt: null,
        },
      ],
    },
  })
  @ApiBody({
    schema: {
      description: 'Array of email addresses',
      example: ['address1@domain.com', 'address2@domain.com', '...'],
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @Post()
  async create(@Body() invites: string[], @Req() request) {
    const decodedToken = request.res.cookie();
    const user = decodedToken.req.user;
    const payload = invites.map(invite => {
      return {
        email: invite,
        companyId: user.selectedCompany.id,
        token: crypto
          .randomBytes(64)
          .toString('base64')
          .replace(/[^A-Za-z0-9]/g, '')
          .substring(0, 16),
      };
    });
    return await this.usersInvitesService.create(payload as UserInvitesDto[]);
  }

  @ApiOperation({ summary: 'Validate invitation token' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Invitation token validated',
      },
    },
  })
  @ApiBody({
    schema: {
      description: 'Validation token',
      example: 'abcdef123456',
    },
  })
  @ApiResponse({
    status: 500,
    schema: {
      anyOf: [
        {
          example: {
            statusCode: 500,
            message: 'Internal server error',
          },
        },
        {
          example: {
            statusCode: 404,
            message: "The user invitation doesn't exist",
            error: 'Not found',
          },
        },
        {
          example: {
            statusCode: 410,
            message: 'The user invitation has been deleted',
            error: 'Gone',
          },
        },
      ],
    },
  })
  @Post('validate')
  async validateInvitationToken(@Body() token: string) {
    const userInvite = await this.usersInvitesService.findOneByParams({
      where: token,
      paranoid: false,
    });
    if (userInvite) {
      if (userInvite.deletedAt) {
        throw new GoneException('The user invitation has been deleted');
      } else {
        return {
          statusCode: 200,
          message: 'Invitation token validated',
        };
      }
    } else {
      throw new NotFoundException("The user invitation doesn't exist");
    }
  }
}
