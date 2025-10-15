import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class EcommerceSegment extends Model<EcommerceSegment> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  rfm: number[];
}
