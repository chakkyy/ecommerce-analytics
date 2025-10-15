import { EcommerceClientGlobalSegment } from '@models/company/ecommerceClientGlobalSegment.entity';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table({ timestamps: true })
export class GlobalSegments extends Model<GlobalSegments> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => EcommerceClientGlobalSegment)
  ecommerceClientGlobalSegments: EcommerceClientGlobalSegment[];
}
