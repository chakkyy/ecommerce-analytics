import { Controller, Body, Post, Get, UseGuards, Res, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, UserLoginDto } from '@modules/users/dto/user.dto';
import { UserAlreadyExist } from '@core/guards/UserAlreadyExist.guard';
import { IsPasswordValid } from '@core/guards/IsPasswordValid.guard';
import { AreNameAndLastnameValid } from '@core/guards/AreNameAndLastNameValid.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseInternalServerError, ApiResponseUnauthorized } from '@utils/apiDocs';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update auth-token from the cookie' })
  @ApiResponse({
    status: 200,
    description: 'Token updated successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Post('updateToken')
  async updateToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const token = req.cookies['auth-token'] || req.headers['auth-token'];
    const verified = this.jwtService.verify(token);
    if (verified && verified.email) {
      const newToken = await this.authService.updateToken(verified.email);
      response.clearCookie('auth-token');
      response.cookie('auth-token', newToken, {
        httpOnly: true,
      });
      return { status: 200, message: 'Token updated' };
    } else {
      return {
        status: 400,
        message: 'Bad Request',
      };
    }
  }

  @ApiCookieAuth()
  @ApiOperation({ summary: 'Verify token from auth-token inside the cookie' })
  @ApiResponse({
    status: 201,
    description: 'Token verified successfully.',
  })
  @ApiResponse({
    status: 400,
    description: "Token can't be verified.",
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('verifyToken')
  async verifyToken(@Req() req: Request) {
    const token = req.cookies['auth-token'] || req.headers['auth-token'];
    const out = this.jwtService.verify(token);
    if (out && out.id && out.email) {
      return {
        status: 200,
        message: 'Token verified successfully',
      };
    } else {
      return {
        status: 400,
        message: "Token can't be verified",
      };
    }
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Logged in',
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid user credentials',
        error: 'Unauthorized',
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(@Body() payload: UserLoginDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(payload.email, payload.password);
    response.cookie('auth-token', token, {
      httpOnly: true,
    });
    return { statusCode: 200, message: 'Logged in' };
  }

  @UseGuards(AreNameAndLastnameValid)
  @UseGuards(IsPasswordValid)
  @UseGuards(UserAlreadyExist)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
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
    status: 403,
    schema: {
      example: {
        statusCode: 403,
        message: 'EMAIL_ALREADY_REGISTERED_ERROR',
        error: 'Forbidden',
        field: 'email',
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
            message: 'PASSWORD_ONLY_ALPHANUMERIC_ERROR',
            error: 'Bad Request',
            field: 'password',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'FIRSTNAME_ONLY_LETTERS_ERROR',
            error: 'Bad Request',
            field: 'firstName',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'LASTNAME_ONLY_LETTERS_ERROR',
            error: 'Bad Request',
            field: 'lastName',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'EMAIL_ALREADY_REGISTERED_ERROR',
            error: 'Bad Request',
            field: 'email',
          },
        },
        {
          example: {
            statusCode: 400,
            message: 'Error on creating userRelationship',
            error: 'Bad Request',
          },
        },
      ],
    },
  })
  @ApiResponseInternalServerError()
  @Post('signup')
  async signUp(@Body() user: UserDto, @Res({ passthrough: true }) response: Response) {
    const userData = await this.authService.signUp(user);
    const token = await this.authService.login(user.email, user.password);
    response.cookie('auth-token', token, {
      httpOnly: true,
    });
    return userData;
  }

  @ApiCookieAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Removes auth-token from Cookie - Log out' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Logged out',
      },
    },
  })
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('auth-token');
    return { statusCode: 200, message: 'Logged out' };
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Shows the google login page for login page' })
  @Get('google/login')
  @UseGuards(AuthGuard('googleLogin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @HttpCode(200)
  @ApiOperation({ summary: 'Shows the google login page for signup page' })
  @Get('google/signup')
  @UseGuards(AuthGuard('googleSignup'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleSignup() {}

  @ApiExcludeEndpoint()
  @Get('google/login/redirect')
  @UseGuards(AuthGuard('googleLogin'))
  async googleRedirectLogin(@Req() req, @Res() res) {
    return await this.authService.googleRedirectLogin(req, res);
  }

  @ApiExcludeEndpoint()
  @Get('google/signup/redirect')
  @UseGuards(AuthGuard('googleSignup'))
  async googleRedirectSignup(@Req() req, @Res() res) {
    return await this.authService.googleRedirectSignup(req, res);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get user data from auth-token inside the cookie' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        firstName: 'string',
        lastName: 'string',
        email: 'john@gmail.com',
        phoneNumber: '+34666666666',
        locale: 'en',
        updatedAt: '2023-03-14T13:10:14.266Z',
      },
    },
  })
  @ApiResponseInternalServerError()
  @ApiResponseUnauthorized()
  async getMe(@Req() req: Request) {
    const token = req.cookies['auth-token'] || req.headers['auth-token'];
    const user = this.jwtService.decode(token);
    return user;
  }
}
