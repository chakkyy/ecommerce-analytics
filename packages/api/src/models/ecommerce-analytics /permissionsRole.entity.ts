import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Permission } from '@models/ecommerce-analytics/permission.entity';
import { Role } from '@models/ecommerce-analytics/role.entity';
import { Company } from '@models/ecommerce-analytics/company.entity';

@Table({ timestamps: true })
export class PermissionsRole extends Model<PermissionsRole> {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  enabled: boolean;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER })
  permissionId: number;

  @BelongsTo(() => Permission)
  permission: Permission;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
