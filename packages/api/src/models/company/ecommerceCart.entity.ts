import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceOrder } from './ecommerceOrder.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceCart extends Model<EcommerceCart> {
  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  total: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceOrder)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => EcommerceOrder)
  order: EcommerceOrder;
}
