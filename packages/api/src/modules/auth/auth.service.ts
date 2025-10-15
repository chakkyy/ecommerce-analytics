import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { Company } from '@models/ecommerce-analytics /company.entity';
import { UsersRelationshipsService } from '@modules/usersRelationships/usersRelationships.service';
import { UsersInvitesService } from '@modules/usersInvites/usersInvites.service';
import { hashPassword, comparePassword } from '../../utils/auth';
import * as dotenv from 'dotenv';
import { User } from '@models/ecommerce-analytics /user.entity';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userInviteService: UsersInvitesService,
    private readonly userRelationshipService: UsersRelationshipsService
  ) {}

  public async login(email, pass) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      return null;
    }
    const token = await this.generateToken(user);
    return token;
  }

  public async signUp(user) {
    const pass = await hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const secureUser = Object.assign({}, newUser['dataValues']);
    delete secureUser.password;

    try {
      if (user.invitationToken) {
        const userInviteResult = await this.userInviteService.findOneByParams({
          token: user.invitationToken,
        });
        if (userInviteResult) {
          const userRelationshipPayload = {
            userId: secureUser.id,
            sectorId: null, // At this time of calling signUp method the sector is not selected yet
            roleId: 3, // By default an invited user is just a member
            companyId: userInviteResult.companyId,
          };

          await this.userRelationshipService.create(userRelationshipPayload);
          await this.userInviteService.deleteById(userInviteResult.id);
        }
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error on creating userRelationship');
    }

    return secureUser;
  }

  public async updateToken(email) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const secureUser = Object.assign({}, user);
    delete secureUser.password;
    return this.jwtService.sign(secureUser, {
      secret: process.env.JWT_SECRET,
    });
  }

  public async validateUser(email: string, pass: string) {
    const user: User & { selectedCompany?: Company } = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    if (user?.companies?.length) {
      user.selectedCompany = user.companies[0];
    }
    const match = await comparePassword(pass, user.password);

    if (!match) {
      return null;
    }

    const secureUser = Object.assign({}, user);
    delete secureUser.password;
    return secureUser;
  }

  async generateToken(payload) {
    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  public async googleRedirectLogin(req, res) {
    const { user: googleUser } = req;
    if (!googleUser) {
      res.redirect(`${process.env.BASE_URL}`);
    }

    const user = await this.userService.findOneByParams({
      where: { googleId: googleUser.googleId, email: googleUser.email },
      include: [Company],
      attributes: { exclude: ['password'] },
      raw: true,
      nest: true,
    });

    if (!user) {
      res.redirect(`${process.env.BASE_URL}login?error=userNotExists`);
    } else {
      const token = await this.generateToken(user);
      res.cookie('auth-token', token, {
        httpOnly: true,
      });
      res.redirect(`${process.env.BASE_URL}dashboards`);
    }
  }

  public async googleRedirectSignup(req, res) {
    const { user: googleUser } = req;
    if (!googleUser) {
      res.redirect(`${process.env.BASE_URL}`);
    }

    const user = await this.userService.findOneByParams({
      where: { googleId: googleUser.googleId, email: googleUser.email },
      include: [Company],
      attributes: { exclude: ['password'] },
      raw: true,
      nest: true,
    });

    if (!user) {
      const payload = {
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        password: process.env.GOOGLE_SIGNUP_DEFAULT_PASSWORD,
      };

      const signupPayload = Buffer.from(JSON.stringify({ ...payload })).toString('base64');
      res.redirect(`${process.env.BASE_URL}signup?userData=${signupPayload}`);
    } else {
      res.redirect(`${process.env.BASE_URL}signup?error=userExists`);
    }
  }
}
