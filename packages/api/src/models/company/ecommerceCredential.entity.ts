import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { EcommerceConnect } from './ecommerceConnect.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceCredential extends Model<EcommerceCredential> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  keyType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  keyValue: string;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;
}
