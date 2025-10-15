import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceProduct } from './ecommerceProduct.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceCategoryTree extends Model<EcommerceCategoryTree> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.BOOLEAN })
  hasChildren: boolean;

  @Column({ type: DataType.INTEGER })
  parentCategoryId: number;

  @Column({ type: DataType.INTEGER })
  categoryLevelId: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  metaTagDescription: string;

  @Column({ type: DataType.STRING })
  url: string;

  @Column({ type: DataType.STRING })
  idVtex: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @HasMany(() => EcommerceProduct)
  ecommerceProducts: EcommerceProduct[];
}
