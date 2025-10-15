import { Injectable } from '@nestjs/common';

import { Role } from '../../models/ecommerce-analytics /role.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly RoleRepository: typeof Role
  ) {}
}
