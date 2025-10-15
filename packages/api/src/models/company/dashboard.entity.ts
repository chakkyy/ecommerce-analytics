import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { Metric } from './metric.entity';

@Table({ paranoid: true, timestamps: true })
export class Dashboard extends Model<Dashboard> {
  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @HasMany(() => Metric)
  metrics: Metric[];
}
