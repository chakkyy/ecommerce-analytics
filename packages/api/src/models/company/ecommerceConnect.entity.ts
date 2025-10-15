import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { EcommerceCredential } from './ecommerceCredential.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceConnect extends Model<EcommerceConnect> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  key: string;

  @Column({ type: DataType.STRING, allowNull: false })
  strategy: string;

  @HasMany(() => EcommerceCredential)
  ecommerceCredentials: EcommerceCredential[];
}
