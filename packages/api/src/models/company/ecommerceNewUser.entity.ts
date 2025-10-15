import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey } from 'sequelize-typescript';
import { EcommerceUser } from './ecommerceUser.entity';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ timestamps: true })
export class EcommerceNewUser extends Model<EcommerceNewUser> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => EcommerceUser)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
