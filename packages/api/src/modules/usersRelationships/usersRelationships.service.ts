import { Injectable } from '@nestjs/common';

import { UsersRelationship } from '../../models/ecommerce-analytics /usersRelationship.entity';
import { UsersRelationshipDto } from './dto/usersRelationship.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRelationshipsService {
  constructor(
    @InjectModel(UsersRelationship)
    private readonly usersrelationshipRepository: typeof UsersRelationship
  ) {}

  async create(usersrelationship: UsersRelationshipDto): Promise<UsersRelationship> {
    return await this.usersrelationshipRepository.create<UsersRelationship>(usersrelationship);
  }
}
