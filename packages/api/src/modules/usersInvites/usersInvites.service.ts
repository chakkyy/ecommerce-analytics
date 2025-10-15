import { Injectable } from '@nestjs/common';
import { UserInvite as UserInvites } from '../../models/ecommerce-analytics /usersInvite.entity';
import { UserInvitesDto } from './dto/userInvites.dto';
import { InjectModel } from '@nestjs/sequelize';

interface paramsType {
  [key: string]: any;
}
@Injectable()
export class UsersInvitesService {
  constructor(
    @InjectModel(UserInvites)
    private readonly userInvitesRepository: typeof UserInvites
  ) {}

  async create(invites: UserInvitesDto[]): Promise<UserInvites[]> {
    return await this.userInvitesRepository.bulkCreate(invites);
  }

  async findOneByParams(params: paramsType): Promise<UserInvites> {
    return await this.userInvitesRepository.findOne<UserInvites>({
      ...params,
      raw: true,
      nest: true,
    });
  }

  async findOneById(id: number): Promise<UserInvites> {
    return await this.userInvitesRepository.findOne<UserInvites>({
      where: { id },
    });
  }

  async deleteById(id: number): Promise<number> {
    return await this.userInvitesRepository.destroy({ where: { id } });
  }
}
