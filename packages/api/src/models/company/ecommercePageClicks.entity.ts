import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommercePageClicks extends Model<EcommercePageClicks> {
  @Column({ type: DataType.STRING })
  page: string;

  @Column({ type: DataType.STRING })
  element: string;

  @Column({ type: DataType.STRING })
  visitorId: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
