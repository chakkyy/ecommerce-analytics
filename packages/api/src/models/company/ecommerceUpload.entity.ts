import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';

enum TemplateType {
  SALES = 'sales',
  PRODUCTS = 'products',
  CUSTOMERS = 'customers',
  STORES = 'stores',
}
@Table({ timestamps: true, paranoid: true })
export class EcommerceUpload extends Model<EcommerceUpload> {
  @Column({ type: DataType.STRING })
  filename: string;

  @Column({ type: DataType.NUMBER })
  size: number;

  @Column({ type: DataType.ENUM(...Object.values(TemplateType)) })
  template: TemplateType;

  @Column({ type: DataType.NUMBER })
  totalLines: number;

  @Column({ type: DataType.NUMBER })
  processedLines: number;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.JSON })
  errors: JSON;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
