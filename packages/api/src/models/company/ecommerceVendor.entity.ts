import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceVendor extends Model<EcommerceVendor> {
  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
