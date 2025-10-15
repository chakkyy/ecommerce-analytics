import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceStore extends Model<EcommerceStore> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  city: string;

  @Column({ type: DataType.STRING })
  postalCode: string;

  @Column({ type: DataType.INTEGER })
  employees: number;

  @Column({
    type: DataType.FLOAT({
      precision: 22,
      scale: 2,
    }),
    defaultValue: 0,
  })
  area: number;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  ecommerceStoreId: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
