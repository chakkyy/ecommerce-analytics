import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Company } from '@models/ecommerce-analytics /company.entity';

@Table({ paranoid: true, timestamps: true })
export class UserInvite extends Model<UserInvite> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
