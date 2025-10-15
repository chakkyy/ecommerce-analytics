import { Injectable } from '@nestjs/common';

import { Permission } from '../../models/ecommerce-analytics /permission.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly PermissionRepository: typeof Permission
  ) {}
}
