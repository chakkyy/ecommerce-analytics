import { AuthGuard } from '@nestjs/passport';
import { Controller, Body, Post, UseGuards, Req, Put, Res } from '@nestjs/common';
import { CheckUpdateSameUser } from '@core/guards/CheckUpdateSameUser.guard';
import { UsersService } from './users.service';
import { AuthService } from '@modules/auth/auth.service';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UsersInvitesService } from '@modules/usersInvites/usersInvites.service';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCookieAuth,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersInvitesService: UsersInvitesService
  ) {}

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Starts reset password process' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Reset password mail sent successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        statusCode: 400,
        message: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @Post('resetPassword')
  async resetPassword(@Body() body) {
    return await this.usersService.resetPassword(body);
  }

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Send email invitations' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        message: 'Invitation mails sent successfully',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 500,
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @Post('sendInvitations')
  @ApiBody({
    schema: {
      description: 'Array of email addresses',
      example: ['address1@domain.com', 'address2@domain.com', '...'],
    },
  })
  async sendInvitations(@Body() invitations, @Req() request) {
    const decodedToken = request.res.cookie();
    const user = decodedToken.req.user;
    const payload = await Promise.all(
      invitations.map(async invitation => {
        const userInvited = await this.usersInvitesService.findOneByParams({
          where: { email: invitation, companyId: user.selectedCompany.id },
          order: [['createdAt', 'DESC']],
        });
        return {
          email: invitation,
          ownerEmail: user.email,
          company: user.selectedCompany.businessName,
          fullname: `${user.firstName} ${user.lastName}`,
          token: userInvited.token,
        };
      })
    );
    return await this.usersService.sendInvitations(payload);
  }

  @ApiCookieAuth()
  @UseGuards(AuthGuard('jwt'), CheckUpdateSameUser)
  @ApiOperation({ summary: 'Update an user' })
  @ApiBody({
    schema: {
      example: {
        firstName: 'string',
        lastName: 'string',
        email: 'test@mail.com',
        phoneNumber: '+34666666666',
        locale: 'en',
      },
    },
  })
  @ApiResponse({
    status: 204,
    schema: {
      example: {
        id: 1,
        firstName: 'string',
        lastName: 'string',
        email: 'test@mail.com',
        phoneNumber: '+34666666666',
        locale: 'en',
        updatedAt: '2023-03-14T13:10:14.266Z',
        createdAt: '2023-03-14T13:10:14.266Z',
        validatedAt: null,
        deletedAt: null,
        countryId: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: [
        {
          example: {
            statusCode: 400,
            message: 'Password must be 6 to 12 alphanumeric long (no special characters)',
            error: 'Bad Request',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'firstName and lastName must be letters only',
            error: 'Bad Request',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'an unknown value was passed to the validate function',
            error: 'Bad Request',
          },
        },
        {
          example: {
            statusCode: 500,
            message: 'Internal server error',
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @Put()
  async update(@Body() user: UserUpdateDto, @Req() request, @Res({ passthrough: true }) response: Response) {
    const decodedToken = request.res.cookie();
    const decodedUser = decodedToken.req.user;
    const userData = await this.usersService.update(user, decodedUser.id);
    const newToken = await this.authService.updateToken(userData.email);
    response.clearCookie('auth-token');
    response.cookie('auth-token', newToken, {
      httpOnly: true,
    });
    delete userData.password;
    return userData;
  }
}
