import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceOrder } from './ecommerceOrder.entity';
import { EcommerceUser } from './ecommerceUser.entity';
import { EcommerceSegment } from './ecommerceSegment.entity';

@Table({ timestamps: true })
export class EcommerceUserSegment extends Model<EcommerceUserSegment> {
  @PrimaryKey
  @ForeignKey(() => EcommerceUser)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;

  @HasMany(() => EcommerceOrder)
  orders: EcommerceOrder[];

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @ForeignKey(() => EcommerceSegment)
  @Column({ type: DataType.INTEGER })
  segmentId: number;

  @BelongsTo(() => EcommerceSegment)
  segment: EcommerceSegment;
}
