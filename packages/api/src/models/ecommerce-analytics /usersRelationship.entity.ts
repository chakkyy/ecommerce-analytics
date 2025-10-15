import { Table, Model, ForeignKey, BelongsTo, Column, DataType } from 'sequelize-typescript';
import { User } from '@models/ecommerce-analytics/user.entity';
import { Sector } from '@models/ecommerce-analytics/sector.entity';
import { Role } from '@models/ecommerce-analytics/role.entity';
import { Company } from '@models/ecommerce-analytics/company.entity';

@Table({ timestamps: true })
export class UsersRelationship extends Model<UsersRelationship> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Sector)
  @Column({ type: DataType.INTEGER })
  sectorId: number;

  @BelongsTo(() => Sector)
  sector: Sector;

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
