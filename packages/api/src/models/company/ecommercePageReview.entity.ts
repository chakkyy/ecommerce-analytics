import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceUser } from './ecommerceUser.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommercePageReview extends Model<EcommercePageReview> {
  @Column({ type: DataType.INTEGER })
  rate: number;

  @ForeignKey(() => EcommerceConnect)
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceUser)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;
}
