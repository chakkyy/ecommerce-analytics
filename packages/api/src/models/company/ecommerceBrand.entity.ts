import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { EcommerceProduct } from './ecommerceProduct.entity';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceBrand extends Model<EcommerceBrand> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  metaTagDescription: string;

  @Column({ type: DataType.STRING })
  imageUrl: string;

  @Column({ type: DataType.NUMBER })
  idVtex: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @HasMany(() => EcommerceProduct)
  EcommerceProducts: EcommerceProduct[];
}
