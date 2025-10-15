import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceOrder } from './ecommerceOrder.entity';
import { EcommerceProduct } from './ecommerceProduct.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceOrderItem extends Model<EcommerceOrderItem> {
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  price: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceProduct)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => EcommerceProduct)
  product: EcommerceProduct;

  @ForeignKey(() => EcommerceOrder)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => EcommerceOrder)
  order: EcommerceOrder;
}
