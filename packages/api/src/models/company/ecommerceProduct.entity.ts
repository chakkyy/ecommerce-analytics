import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceStore } from './ecommerceStore.entity';
import { EcommerceOrderItem } from './ecommerceOrderItem.entity';
import { EcommerceBrand } from './ecommerceBrand.entity';
//import { EcommerceSubCategory } from './ecommerceSubCategory.entity';
import { EcommerceCategoryTree } from './ecommerceCategoryTree.entity';
@Table({ paranoid: true, timestamps: true })
export class EcommerceProduct extends Model<EcommerceProduct> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  sku: string;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  discount: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  discountPrice: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  cost: number;

  @PrimaryKey
  @Column({ type: DataType.STRING })
  productId: string;

  @Column({ type: DataType.INTEGER })
  stock: number;

  @Column({ type: DataType.STRING })
  type: string;

  @ForeignKey(() => EcommerceCategoryTree)
  @Column({ type: DataType.INTEGER })
  ecommerceCategoryTreesId: number;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @ForeignKey(() => EcommerceBrand)
  @Column({ type: DataType.INTEGER })
  ecommerceBrandId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceStore)
  @Column({ type: DataType.INTEGER })
  ecommerceStoreId: number;

  @BelongsTo(() => EcommerceStore)
  ecommerceStore: EcommerceStore;

  @BelongsTo(() => EcommerceBrand)
  ecommerceBrands: EcommerceBrand;

  @BelongsTo(() => EcommerceCategoryTree)
  ecommerceCategoryTrees: EcommerceCategoryTree;

  @HasMany(() => EcommerceOrderItem)
  orderItems: EcommerceOrderItem[];
}
