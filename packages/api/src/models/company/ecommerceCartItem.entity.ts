import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceCart } from './ecommerceCart.entity';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceCartItem extends Model<EcommerceCartItem> {
  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
  })
  total: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceCart)
  @Column({ type: DataType.INTEGER })
  cartId: number;

  @BelongsTo(() => EcommerceCart)
  cart: EcommerceCart;
}
