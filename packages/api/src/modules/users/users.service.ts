import { Injectable } from '@nestjs/common';
import { User } from '../../models/ecommerce-analytics /user.entity';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { MailService } from '@modules/mail/mail.service';
import { Company } from '@models/ecommerce-analytics /company.entity';
import { hashPassword } from 'src/utils/auth';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

enum MailTemplates {
  RESET_PASSWORD = 'resetPassword',
  INVITATION = 'invitation',
}

interface paramsType {
  [key: string]: any;
}

interface InvitationMail {
  email: string;
  fullname: string;
  company: string;
  ownerEmail: string;
  token: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly mailService: MailService
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(where?: any): Promise<User[]> {
    return await this.userRepository.findAll<User>({ where });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({
      where: { email: { [Op.iLike]: `%${email}` } },
      include: [Company],
    });
    if (!user) return null;
    return user.toJSON();
  }

  async findOneByParams(params: paramsType): Promise<User> {
    return await this.userRepository.findOne<User>({
      ...params,
      raw: true,
      nest: true,
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async resetPassword(body: any): Promise<any> {
    try {
      const { email } = body;
      await this.mailService.send(email, 'Reset Password', MailTemplates.RESET_PASSWORD, {
        email,
      });
      return {
        message: 'Reset password mail sent successfully',
        status: 200,
      };
    } catch (err) {
      return {
        message: err.response,
        status: 400,
      };
    }
  }

  async sendInvitations(messages: InvitationMail[]): Promise<any> {
    try {
      const promises = [];
      messages.forEach((message: InvitationMail) => {
        const { email, fullname, company, ownerEmail, token } = message;
        promises.push(
          this.mailService.send(email, 'Te han invitado a ecommerce-analytics  Ecommerce', MailTemplates.INVITATION, {
            email: ownerEmail,
            fullname,
            company,
            token,
          })
        );
      });

      await Promise.all(promises);

      return {
        message: 'Invitation mails sent successfully',
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        message: err,
        status: 400,
      };
    }
  }

  async update(user: UserUpdateDto, id: number): Promise<any> {
    try {
      const payload = { ...user };
      if (payload.password) {
        payload.password = await hashPassword(payload.password);
      }
      const out = await this.userRepository.update(payload, {
        where: { id },
        returning: true,
      });
      return out[1][0].dataValues;
    } catch (err) {
      console.error(err);
      return {
        message: err.response,
        status: 400,
      };
    }
  }
}
