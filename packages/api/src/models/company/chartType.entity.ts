import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class ChartType extends Model<ChartType> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;
}
