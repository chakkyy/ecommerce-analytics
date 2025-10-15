import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceClientGlobalSegment } from './ecommerceClientGlobalSegment.entity';
import { EcommerceOrder } from './ecommerceOrder.entity';
import { EcommerceUserSegment } from './ecommerceUserSegment.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceUser extends Model<EcommerceUser> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  @ForeignKey(() => EcommerceClientGlobalSegment)
  @ForeignKey(() => EcommerceUserSegment)
  @ForeignKey(() => EcommerceOrder)
  id: number;

  @Column({ type: DataType.STRING })
  fullName: string;

  @Column({ type: DataType.STRING })
  visitorId: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  city: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceClientGlobalSegment)
  visitor: EcommerceClientGlobalSegment;

  @HasMany(() => EcommerceOrder)
  orders: EcommerceOrder[];

  @BelongsTo(() => EcommerceUserSegment)
  segment: EcommerceUserSegment;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
