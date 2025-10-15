import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceProduct } from './ecommerceProduct.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceProductCustomization extends Model<EcommerceProductCustomization> {
  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  size: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceProduct)
  @Column({ type: DataType.INTEGER })
  ecommerceProductId: number;

  @BelongsTo(() => EcommerceProduct)
  ecommerceProduct: EcommerceProduct;
}
