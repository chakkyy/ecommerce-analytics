import { Injectable } from '@nestjs/common';

import { PermissionsRole } from '../../models/ecommerce-analytics /permissionsRole.entity';
import { PermissionRoleDto } from './dto/permissionRole.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PermissionsRolesService {
  constructor(
    @InjectModel(PermissionsRole)
    private readonly permissionsroleRepository: typeof PermissionsRole
  ) {}

  async create(permissionsrole: PermissionRoleDto): Promise<PermissionsRole> {
    return await this.permissionsroleRepository.create<PermissionsRole>(permissionsrole);
  }
}
