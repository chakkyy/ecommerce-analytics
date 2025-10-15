import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceVendor } from './ecommerceVendor.entity';
import { EcommerceStore } from './ecommerceStore.entity';
import { EcommerceOrderItem } from './ecommerceOrderItem.entity';
import { EcommerceClientGlobalSegment } from './ecommerceClientGlobalSegment.entity';
import { EcommerceUser } from './ecommerceUser.entity';
import { EcommerceUserSegment } from './ecommerceUserSegment.entity';
@Table({ paranoid: true, timestamps: true })
export class EcommerceOrder extends Model<EcommerceOrder> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  total: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  cost: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  shippingCost: number;

  @PrimaryKey
  @Column({ type: DataType.STRING })
  orderId: string;

  @Column({ type: DataType.STRING })
  status: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceVendor)
  @Column({ type: DataType.INTEGER, allowNull: true })
  vendorId: number;

  @BelongsTo(() => EcommerceVendor)
  vendor: EcommerceVendor;

  @ForeignKey(() => EcommerceUser)
  @ForeignKey(() => EcommerceClientGlobalSegment)
  @ForeignKey(() => EcommerceUserSegment)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => EcommerceStore)
  @Column({ type: DataType.INTEGER })
  ecommerceStoreId: number;

  @BelongsTo(() => EcommerceStore)
  ecommerceStore: EcommerceStore;

  @BelongsTo(() => EcommerceClientGlobalSegment)
  clientGlobalSegment: EcommerceClientGlobalSegment;

  @BelongsTo(() => EcommerceUserSegment)
  userSegment: EcommerceUserSegment;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;

  @HasMany(() => EcommerceOrderItem)
  orderItems: EcommerceOrderItem[];
}
