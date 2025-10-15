import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommercePageViews extends Model<EcommercePageViews> {
  @Column({ type: DataType.STRING })
  page: string;

  @Column({ type: DataType.STRING })
  referer: string;

  @Column({ type: DataType.STRING })
  origin: string;

  @Column({ type: DataType.BOOLEAN })
  isMobile: boolean;

  @Column({ type: DataType.INTEGER })
  duration: number;

  @Column({ type: DataType.STRING })
  visitorId: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
